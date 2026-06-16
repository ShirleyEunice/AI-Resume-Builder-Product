import express from 'express';
import { createResume, deleteResume, getResumeById, getResumes, migrateResumeOwner, updateResume } from '../controllers/resumeController.js';
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/migrate-owner', protect, migrateResumeOwner);
router.post('/', protect, createResume);
router.get('/', protect, getResumes);
router.get('/:id', protect, getResumeById);
router.put('/:id', protect, updateResume);
router.delete('/:id', protect, deleteResume);

export default router;
