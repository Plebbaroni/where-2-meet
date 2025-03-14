/*
ROUTES, THIS IS WHAT THE FRONTEND SHOULD BE USING TO COMMUNICATE WITH THE BACKEND
*/
import express from "express"
import controller from "./controller"

const router = express.Router();

router.get("/hello", controller.hello);

export default router;