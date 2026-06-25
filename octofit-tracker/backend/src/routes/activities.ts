import { Router, Request, Response } from 'express';
import Activity from '../models/activity.model';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const activities = await Activity.find().populate('user');
  res.json({ activities });
});

router.post('/', async (req: Request, res: Response) => {
  const activity = new Activity(req.body);
  await activity.save();
  res.status(201).json({ activity });
});

router.get('/:id', async (req: Request, res: Response) => {
  const activity = await Activity.findById(req.params.id).populate('user');
  res.json({ activity });
});

export default router;
