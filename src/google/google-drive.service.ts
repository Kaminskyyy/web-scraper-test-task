import * as fs from 'fs';
import { google } from 'googleapis';
import { GoogleAuthService } from './google-auth.service';
import { Format } from '../parse/interfaces/formats.interface';

export class GoogleDriveService {
  private static drive = google.drive({ version: 'v3', auth: GoogleAuthService.getAuth() });

  static async uploadFile(tmpFileName: string, actualFileName: string, format: Format): Promise<void> {
    try {
      const response = await this.makeUploadRequest(tmpFileName, actualFileName, format);
      console.log('RESPONSE: ', response);
    } catch (error) {
      console.log(error);
    }
  }

  private static async makeUploadRequest(tmpFileName: string, actualFileName: string, format: Format) {
    let mimeType = '';

    switch (format) {
      case 'json':
        mimeType = 'application/json';
        break;
      case 'xlsx':
        mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        break;
      case 'csv':
        mimeType = 'text/csv';
        break;
      default:
        throw new Error('unknown format');
    }

    const media = {
      mimeType: mimeType,
      body: fs.createReadStream(tmpFileName)
    };

    const requestBody = {
      name: actualFileName,
      parents: [process.env.GOOGLE_DRIVE_TARGET_FOLDER_ID!]
    };

    const fields = 'id,name';

    const { data } = await this.drive.files.create({
      media,
      requestBody,
      fields
    });

    return data;
  }
}
