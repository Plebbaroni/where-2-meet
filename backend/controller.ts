/*
 BACKEND LOGIC, DIFF FROM API.TS IN THAT API SHOULD JUST BE GETTING AND
 RETRIEVING DATA, THIS WORKS WITH IT/TRANSFORMS IT
*/
import express, { Request, Response } from "express";

class controller {
    //useless route, just showcases how to link frontend and backend kinda
    async hello(req:Request, res:Response) {
        res.status(200).send({message:"hello"});
    }
}
export default new controller();