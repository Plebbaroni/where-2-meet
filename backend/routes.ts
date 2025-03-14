/*
ROUTES, THIS IS WHAT THE FRONTEND SHOULD BE USING TO COMMUNICATE WITH THE BACKEND
*/
import express from "express"
import controller from "./controller"

const router = express.Router();

router.get("/hello", controller.hello);
router.post("/intersections", controller.getIntersectionsAndPlaces);
router.post("/places", controller.getPlaces);
router.post("/autocomplete", controller.autocomplete);
export default router;