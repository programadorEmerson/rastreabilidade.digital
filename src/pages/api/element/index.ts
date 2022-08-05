import { Request, Response } from 'express';

export default function handler(_req: Request, res: Response) {
  res.status(400).json({ error: 'Method not allowed' });
}
