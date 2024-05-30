import express from 'express';
import { createResidency, getAllResidencies, getAllResidenciesSold, getResidency, updateResidency,  } from '../controllers/resdCntrl.js';
import jwtCheck from '../config/auth0Config.js';
const router =express.Router()

router.post("/create", jwtCheck, createResidency)
router.get("/allresd", getAllResidencies)
router.post("/sale", getAllResidenciesSold)
router.get("/:id",getResidency)
router.put("/update", updateResidency);




export {router as residencyRoute}