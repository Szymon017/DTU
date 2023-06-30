import express from "express";
import { register, login, getAllOfficers, deleteOfficer } from "../controllers/OfficerController.js";
import { authOfficer, authenticateToken } from "../middleware/Auth.js";
const router = express.Router();


router.get('/')
router.get('/all',getAllOfficers)
router.get('/authenticate', authOfficer)
router.post('/', register)
router.post('/login', login)
router.delete('/:id',deleteOfficer)
router.put('/')

export default router;