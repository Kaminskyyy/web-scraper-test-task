import { User } from '../db/entity/user.entity';
import { GoogleDriveService } from '../google/google-drive.service';
import { FileFormatService } from './file-format.service';
import { Format } from './interfaces/formats.interface';
import { ParseResults } from './interfaces/parse-results.interface';
import { ParseReqeustsService } from './parse-requests.service';
import { ScrapeService } from './scrape.service';

export class ParseService {
  static async parse(user: User): Promise<ParseResults> {
    const pageData = await ScrapeService.parsePage();

    const formats: Format[] = ['json', 'xlsx', 'csv'];
    const fileName = `${user.email}--${Date.now()}`;

    const results = [];
    for (const format of formats) {
      const fileNameWithFormat = fileName + `.${format}`;
      const tmpFile = await FileFormatService.to(format, pageData);

      try {
        const response = await GoogleDriveService.uploadFile(tmpFile.name, fileNameWithFormat, format);

        results.push({
          format,
          isUploaded: true,
          id: response?.id,
          name: response?.name,
          link: response?.webViewLink
        });
      } catch (error) {
        console.log(error);

        results.push({
          format,
          isUploaded: false
        });
      } finally {
        tmpFile.removeCallback();
      }
    }

    await ParseReqeustsService.addParseRequest(user);

    return { files: results };
  }
}
