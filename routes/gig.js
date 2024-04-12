import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getGig, getGigs, createGig, deleteGig } from "../controllers/gig.js";

//create an express router
const router = express.Router();

router.get("/all", getGigs);
router.get("/single/:id", getGig);
router.post("/add", verifyToken, createGig);
router.delete("/delete/:id", verifyToken, deleteGig);

export default router;
// we will import this router in app.js as gigRouter