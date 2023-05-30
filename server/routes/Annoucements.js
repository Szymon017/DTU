import express from 'express'
import { addNewAnnoucement, deleteAnAnnoucement, getAllAnnoucements, updateAnnoucement } from '../controllers/AnnoucementController.js';

const router = express.Router();

router.get('/', getAllAnnoucements);
router.post('/', addNewAnnoucement);
router.delete('/:id', deleteAnAnnoucement);
router.put('/:id', updateAnnoucement);
export default router;