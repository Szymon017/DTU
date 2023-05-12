import express from "express";
import { addNewPerson, getPersons, updatePerson } from "../controllers/PersonsController.js";
const router = express.Router();


router.get('/', getPersons)
router.post('/', addNewPerson)
router.delete('/:id')
router.put('/:id', updatePerson)

export default router;