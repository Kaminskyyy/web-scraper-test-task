import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
import { jwtPayload } from '../interfaces/jwt-payload.interface';
import { NotFoundException } from '../../errors/not-found.exception';

export default passport.use(
  'jwt',
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET!
    },
    async (jwtPayload: jwtPayload, done) => {
      const user = await UsersService.findById(jwtPayload.id);
      if (!user) return done(new NotFoundException('user'), null);

      done(null, user);
    }
  )
);
