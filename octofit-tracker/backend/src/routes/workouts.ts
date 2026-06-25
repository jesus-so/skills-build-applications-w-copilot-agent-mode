import { Router, Request, Response } from 'express';
import Workout from '../models/workout.model';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const workouts = await Workout.find();
  res.json({ workouts });
});

router.post('/', async (req: Request, res: Response) => {
  const workout = new Workout(req.body);
  await workout.save();
  res.status(201).json({ workout });
});

router.get('/:id', async (req: Request, res: Response) => {
  const workout = await Workout.findById(req.params.id);
  res.json({ workout });
});

export default router;
