import express from "express";
import { addNewCase, deleteCase, getAllCases, updateCase } from "../controllers/CasesController.js";
const router = express.Router();


router.get('/', getAllCases )
router.post('/', addNewCase)
router.delete('/:id', deleteCase)
router.put('/:id', updateCase)

export default router;