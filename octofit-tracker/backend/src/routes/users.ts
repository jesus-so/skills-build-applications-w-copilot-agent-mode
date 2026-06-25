import { Router, Request, Response } from 'express';
import User from '../models/user.model';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const users = await User.find().populate('team');
  res.json({ users });
});

router.post('/', async (req: Request, res: Response) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json({ user });
});

router.get('/:id', async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id).populate('team');
  res.json({ user });
});

export default router;
