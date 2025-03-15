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
    } from 'traveltime-api';
import express, { Request, Response } from "express";
import api from './api';
import {inputObject} from './interfaces'

class controller {
    //useless route, just showcases how to link frontend and backend kinda
    async hello(req:Request, res:Response) {
        res.status(200).send({message:"hello"});
    }

    async getIntersections(req:Request, res:Response) {
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
            res.status(200).send({intersection: intersection});
            return;
        } catch (e) {
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

    async biggestShell(shapes : TimeMapResponseShape[]) { 
        var max = 0;
        for (var i = 0; i < shapes.length; i++) {
            if (shapes[i].shell.length > shapes[max].shell.length) {
                max = i;
            }
        }
        return shapes[max].shell;
    }
}


export default new controller();