import express from "express";
import { addNewPerson, getAllPersons } from "../controllers/PersonsController.js";
const router = express.Router();


router.get('/', getAllPersons)
router.post('/', addNewPerson)
router.delete('/:id')
router.put('/:id')

export default router;