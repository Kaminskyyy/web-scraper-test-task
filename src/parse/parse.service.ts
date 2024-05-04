import { User } from '../db/entity/user.entity';
import { GoogleDriveService } from '../google/google-drive.service';
import { FileFormatService } from './file-format.service';
import { Format } from './interfaces/formats.interface';
import { ParseReqeustsService } from './parse-requests.service';
import { ScrapeService } from './scrape.service';

export class ParseService {
  static async parse(user: User) {
    const pageData = await ScrapeService.parsePage();

    const formats: Format[] = ['json', 'xlsx', 'csv'];
    const fileName = `${user.email}--${Date.now()}`;

    formats.forEach(async (format) => {
      const fileNameWithFormat = fileName + `.${format}`;
      const tmpFile = await FileFormatService.to(format, pageData);

      try {
        await GoogleDriveService.uploadFile(tmpFile.name, fileNameWithFormat, format);
      } catch (error) {
        console.log(error);
      } finally {
        tmpFile.removeCallback();
      }
    });

    await ParseReqeustsService.addParseRequest(user);

    return pageData;
  }
}
