import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import checkSession from '../middleware/check-session.middleware';
import { AuthStrategy } from '../auth/strategies/strategy-name.enum';
import { ParseService } from './parse.service';
import { ParseReqeustsService } from './parse-requests.service';
import { User } from '../db/entity/user.entity';

const route = Router();

route.get(
  '/parse',
  checkSession,
  passport.authenticate(AuthStrategy.JWT),
  async (req: Request, res: Response, next: NextFunction) => {
    const pageData = await ParseService.parsePage();

    ParseReqeustsService.addParseRequest(req.user as User);
    res.json({ pageData });
  }
);

export default route;
