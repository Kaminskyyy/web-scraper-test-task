import passport from 'passport';
import { Strategy } from 'passport-local';
import { UsersService } from '../../users/users.service';
import { NotFoundException } from '../../errors/not-found.exception';
import { InvalidCredentialsException } from '../../errors/invalid-credentials.exception';
import { HashService } from '../hash.service';
import { AuthStrategy } from './strategy-name.enum';

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  const user = await UsersService.findById(+id);
  if (!user) return done(new NotFoundException('user'), null);

  done(null, user);
});

export default passport.use(
  AuthStrategy.LOCAL,
  new Strategy(
    {
      usernameField: 'email'
    },
    async (email, password, done) => {
      const user = await UsersService.findByEmail(email);
      if (!user) return done(new NotFoundException('user'), false);

      const isValidPassword = await HashService.verifyPassword(password, user.password);
      if (!isValidPassword) done(new InvalidCredentialsException(), false);

      done(null, user);
    }
  )
);
