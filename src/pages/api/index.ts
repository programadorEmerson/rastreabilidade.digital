import { Request, Response } from 'express';

export default function handler(_req: Request, res: Response) {
  res.status(200).json({ message: 'The server is running' });
}
