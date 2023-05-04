import express from "express";
import { register, login, getAllOfficers, deleteOfficer } from "../controllers/OfficerController.js";
const router = express.Router();


router.get('/')
router.get('/all',getAllOfficers)
router.post('/', register)
router.post('/login', login)
router.delete('/:id',deleteOfficer)
router.put('/')

export default router;