import { google } from 'googleapis';
import path from 'path';

const keyFilePath = path.join(__dirname, './../../src/google/credentials/google-credentials.json');
const scopes = ['https://www.googleapis.com/auth/drive'];

const auth = new google.auth.GoogleAuth({
  keyFile: keyFilePath,
  scopes: scopes
});

export class GoogleAuthService {
  static getAuth() {
    return auth;
  }
}
