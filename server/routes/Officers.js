import express from "express";
import { register, login, getAllOfficers } from "../controllers/OfficerController.js";
const router = express.Router();


router.get('/')
router.get('/all',getAllOfficers)
router.post('/', register)
router.post('/login', login)
router.delete('/')
router.put('/')

export default router;