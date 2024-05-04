import { User } from '../db/entity/user.entity';
import { GoogleDriveService } from '../google/google-drive.service';
import { FileFormatService } from './file-format.service';
import { Format } from './interfaces/formats.interface';
import { ParseReqeustsService } from './parse-requests.service';
import { ScrapeService } from './scrape.service';

export class ParseService {
  static async parse(user: User) {
    const pageData = await ScrapeService.parsePage();

    const formats: Format[] = ['json', 'xlsx'];

    for (let i = 0; i < 2; i++) {
      const fileName = `${user.email}--${Date.now()}.${formats[i]}`;
      const tmpFile = FileFormatService.to(formats[i], pageData);

      try {
        await GoogleDriveService.uploadFile(tmpFile.name, fileName, formats[i]);
      } catch (error) {
        throw error;
      } finally {
        tmpFile.removeCallback();
      }
    }

    await ParseReqeustsService.addParseRequest(user);
  }
}
