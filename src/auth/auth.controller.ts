import { NextFunction, Request, Response, Router } from 'express';
import validate from '../middleware/validation.middleware';
import { UserSignUpDto } from './dto/user-sign-up.dto';
import { UserLoginDto } from './dto/user.login.dto';
import { UsersService } from '../users/users.service';
import passport from 'passport';
import { JwtService } from './jwt.service';
import checkSession from '../middleware/check-session.middleware';
import { AuthStrategy } from './strategies/strategy-name.enum';

const route = Router();

route.post('/sign-up', validate('body', UserSignUpDto), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UsersService.create(req.body);
    const jwt = JwtService.create(user.id);

    res.status(201).json({ user, access_token: jwt });
  } catch (error) {
    next(error);
  }
});

route.post(
  '/login',
  validate('body', UserLoginDto),
  passport.authenticate(AuthStrategy.LOCAL),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id!;
      if (!userId) throw new Error('User session is not set');

      const jwt = JwtService.create(userId);

      res.status(200).send({
        user: req.user,
        access_token: jwt
      });
    } catch (error) {
      next(error);
    }
  }
);

route.get('/logout', checkSession, passport.authenticate(AuthStrategy.JWT), (req: Request, res: Response) => {
  req.logout((error) => {
    if (error) return res.sendStatus(400);
    res.sendStatus(200);
  });
});

export default route;
