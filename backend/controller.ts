/*
 BACKEND LOGIC, DIFF FROM API.TS IN THAT API SHOULD JUST BE GETTING AND
 RETRIEVING DATA, THIS WORKS WITH IT/TRANSFORMS IT
*/
import {
    TimeMapRequestArrivalSearch,
    TimeMapRequestDepartureSearch,
    TransportationRequestCommons,
    TransportationType,
    TravelTimeClient,
    TimeMapRequestUnionOrIntersection,
    TimeMapResponseShape,
    TimeMapResponseResult,
    Coords
    } from 'traveltime-api';
import express, { Request, Response } from "express";
import api from './api';
import {inputObject} from './interfaces'
import polylabel from 'polylabel';


  async function biggestShell(shapes : TimeMapResponseResult[]) {
    try {
        for (const isochrone of shapes) {
            if (isochrone.search_id === "intersection of isochrones") {
                let max = null;
                let maxlen = 0;
                for (const shape of isochrone.shapes) {
                    if (shape.shell.length > maxlen) {
                        maxlen = shape.shell.length;
                        max = shape.shell;
                    }
                }
                return max;
            }
        }
        return null;
    } catch (e) {
        console.error('error', e);
    }
}

async function getBiggestMean(coords:Coords[]) {
    const coordsArr: number[][] = coords.map(({ lat, lng }): [number, number] => [lat, lng]);
    const res = await polylabel([coordsArr], 1.0);
    return res;
}

class controller {
    //useless route, just showcases how to link frontend and backend kinda
    async hello(req:Request, res:Response) {
        res.status(200).send({message:"hello"});
    }

    async getIntersectionsAndPlaces(req:Request, res:Response) {
        try {
            /*
                i'll assume that the frontend sends a list of request structs, each request struct
                contains address, mode of transport, and max time.
            */
            const inputList = req.body.input;
            const timeMapArray:TimeMapRequestDepartureSearch[] = [];
            let i = 0;
            for (const input of inputList) {
                const timeMapRequestDepartureThing =  await api.generateTimeMapRequestDepartureSearch(input.address, input.modeOfTransport, input.maxTravelTime, i.toString());
                timeMapArray.push(timeMapRequestDepartureThing);
                i++;
            }
            const intersection = await api.generateIntersection(timeMapArray);
            const biggestshellvar = await biggestShell(intersection);
            if (biggestshellvar === null || biggestshellvar === undefined) {
                console.error('wtf');
                return;
            }
            const mean = await getBiggestMean(biggestshellvar);
            const placesData = await api.googlePlaces([mean[1], mean[0]]);
            res.status(200).send({
                intersection: intersection,
                places: placesData.places
            });

            return;
        } catch (e) {
            console.error(e);
            res.status(400).send({error: e});
            return;
        }
    }

    async getPlaces(req:Request, res:Response) {
        try {
            const coordinates:number[] = req.body.coordinates;
            const data = await api.googlePlaces(coordinates);
            res.status(200).send(data.places);
        } catch (e) {
            res.status(400).send({error: e});
            return;
        }
    }
}


export default new controller();