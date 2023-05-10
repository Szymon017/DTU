import express from "express";
import { addCrime, getAllCrimeOrgs, updateCrimeOrg } from "../controllers/CrimeControllers.js";
const router = express.Router();


router.get('/', getAllCrimeOrgs)
router.post('/', addCrime)
router.delete('/:id')
router.put('/:id', updateCrimeOrg)

export default router;