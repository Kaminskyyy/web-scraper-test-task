import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import checkSession from '../middleware/check-session.middleware';
import { AuthStrategy } from '../auth/strategies/strategy-name.enum';
import { User } from '../db/entity/user.entity';
import { ParseService } from './parse.service';
import validate from '../middleware/validation.middleware';
import { ParseRequestsQueryDto } from './dto/parse-requests-query-dto';
import { ParseReqeustsService } from './parse-requests.service';

const route = Router();

route.get(
  '/parse',
  checkSession,
  passport.authenticate(AuthStrategy.JWT),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const results = await ParseService.parse(req.user as User);

      res.status(200).json(results);
    } catch (error) {
      next(error);
    }
  }
);

route.get(
  '/parse-requests',
  checkSession,
  passport.authenticate(AuthStrategy.JWT),
  validate('query', ParseRequestsQueryDto),
  async (req: Request, res: Response, next: NextFunction) => {
    const page = req.query.page as unknown as number | undefined;
    const pageSize = req.query.pageSize as unknown as number | undefined;

    try {
      const response = await ParseReqeustsService.findAll(page, pageSize);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

export default route;
