import express from "express";
import { addCrime, getAllCrimeOrgs, updateCrimeOrg } from "../controllers/CrimeControllers.js";
import { authenticateToken } from "../middleware/Auth.js";
const router = express.Router();


router.get('/', authenticateToken, getAllCrimeOrgs)
router.post('/', authenticateToken, addCrime)
router.delete('/:id', )
router.put('/:id', updateCrimeOrg)

export default router;