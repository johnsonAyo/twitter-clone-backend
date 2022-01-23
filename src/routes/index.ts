import express, { NextFunction, Response, Request } from 'express';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.render('home');
}); // gets all authors

router.get('/dashboard', (req: Request, res: Response) => {
  res.render('dashboard');
});

export default router;
