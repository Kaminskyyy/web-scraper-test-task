import { JWT } from 'google-auth-library';

const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
const scopes = ['https://www.googleapis.com/auth/drive'];

const auth = new JWT({
  email: clientEmail,
  key: privateKey,
  scopes
});

export class GoogleAuthService {
  static getAuth() {
    return auth;
  }
}
