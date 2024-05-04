import * as fs from 'fs';
import { google } from 'googleapis';
import { GoogleAuthService } from './google-auth.service';

export class GoogleDriveService {
  static async uploadFile(file: any, fileName: string) {
    const json = JSON.stringify(file);

    const writableStream = fs.createWriteStream(fileName);
    writableStream.write(json);
    writableStream.end();

    const fileMetadata = {
      name: fileName,
      parents: ['18p5fiWJDYP30G8pb0BAi23ivdG57vpJu']
    };

    const media = {
      mimeType: 'application/json',
      body: fs.createReadStream(fileName)
    };

    const { data } = await google.drive({ version: 'v3', auth: GoogleAuthService.getAuth() }).files.create({
      media: {
        mimeType: 'application/json',
        body: fs.createReadStream(fileName)
      },
      requestBody: {
        name: fileName,
        parents: ['1skVbEKFLH0axBJreCm5qioMF-y5ld5Zb']
      },
      fields: 'id,name'
    });

    console.log('RESPONSE: ', data);

    fs.unlinkSync(fileName);
  }
}
