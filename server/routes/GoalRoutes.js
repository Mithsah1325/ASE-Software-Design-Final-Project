import express from 'express';
import { saveGoal, getGoals, getGoalById, updateGoal, deleteGoal } from '../controllers/GoalController.js';

const router = express.Router();

router.post('/', saveGoal);
router.get('/', getGoals);
router.get('/:id', getGoalById);
router.put('/:id', updateGoal);
router.delete('/:id', deleteGoal);

export default router;
