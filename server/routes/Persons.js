import express from "express";
import { addNewPerson, getAllPersons, updatePerson } from "../controllers/PersonsController.js";
const router = express.Router();


router.get('/', getAllPersons)
router.post('/', addNewPerson)
router.delete('/:id')
router.put('/:id', updatePerson)

export default router;