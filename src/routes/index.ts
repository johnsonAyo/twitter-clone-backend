import express, { NextFunction, Response, Request } from 'express';
const router = express.Router();
import { isLoggedIn} from '../middleware/passport'

router.get('/', (req: Request, res: Response) => {
  res.render('home');
}); // gets all authors

router.get('/dashboard', isLoggedIn,(req: Request, res: Response) => {
  res.render('dashboard');
});

export default router;
