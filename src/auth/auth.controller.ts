import { NextFunction, Request, Response, Router } from 'express';
import validate from '../middleware/validation.middleware';
import { UserSignUpDto } from './dto/user-sign-up.dto';
import { UserLoginDto } from './dto/user.login.dto';
import passport from 'passport';
import checkSession from '../middleware/check-session.middleware';
import { AuthStrategy } from './strategies/strategy-name.enum';
import { AuthService } from './auth.service';
import { User } from '../db/entity/user.entity';

const route = Router();

route.post(
  '/sign-up',
  validate('body', UserSignUpDto),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const response = await AuthService.signUp(req.body);

      await new Promise((resolve, reject) => {
        req.login({ id: response.user.id } as User, (error) => (error ? reject(error) : resolve(null)));
      });

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
);

route.post(
  '/login',
  validate('body', UserLoginDto),
  passport.authenticate(AuthStrategy.LOCAL),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = req.user;
      if (!user) throw new Error('User session is not set');

      const response = AuthService.login(req.user as User);

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
);

route.get('/logout', checkSession, passport.authenticate(AuthStrategy.JWT), (req: Request, res: Response): void => {
  req.logout((error) => {
    if (error) return res.sendStatus(500);
    res.sendStatus(200);
  });
});

export default route;
