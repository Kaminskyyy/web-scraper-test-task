import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import checkSession from '../middleware/check-session.middleware';
import { AuthStrategy } from '../auth/strategies/strategy-name.enum';
import { User } from '../db/entity/user.entity';
import { ParseService } from './parse.service';

const route = Router();

route.get(
  '/parse',
  checkSession,
  passport.authenticate(AuthStrategy.JWT),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pageData = await ParseService.parse(req.user as User);

      res.status(200).json(pageData);
    } catch (error) {
      next(error);
    }
  }
);

route.get('/test-upload', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

export default route;
