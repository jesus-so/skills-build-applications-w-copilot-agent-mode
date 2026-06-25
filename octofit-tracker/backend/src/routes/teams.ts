import { Router, Request, Response } from 'express';
import Team from '../models/team.model';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const teams = await Team.find().populate('members');
  res.json({ teams });
});

router.post('/', async (req: Request, res: Response) => {
  const team = new Team(req.body);
  await team.save();
  res.status(201).json({ team });
});

router.get('/:id', async (req: Request, res: Response) => {
  const team = await Team.findById(req.params.id).populate('members');
  res.json({ team });
});

export default router;
