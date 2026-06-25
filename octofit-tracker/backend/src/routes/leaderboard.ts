import { Router, Request, Response } from 'express';
import Leaderboard from '../models/leaderboard.model';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const leaderboard = await Leaderboard.find().populate('user').sort({ rank: 1 });
  res.json({ leaderboard });
});

router.get('/top', async (req: Request, res: Response) => {
  const top = await Leaderboard.find().populate('user').sort({ rank: 1 }).limit(10);
  res.json({ top });
});

export default router;
