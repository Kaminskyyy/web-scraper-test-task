import tmp, { FileResult } from 'tmp';
import XLSX from 'xlsx';
import * as fs from 'fs/promises';
import * as fsAsync from 'fs/promises';
import { Format } from './interfaces/formats.interface';
import { Person, PersonFlattened } from './interfaces/person.interface';

export class FileFormatService {
  static toXLSX(objArray: Person[]): FileResult {
    const tmpFile = tmp.fileSync();

    const flattenedObjArray = this.flattenSocailNetworksArray(objArray);

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(flattenedObjArray);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'People');
    XLSX.writeFile(workbook, tmpFile.name);

    return tmpFile;
  }

  static async toJSON(objArray: Person[]): Promise<tmp.FileResult> {
    const tmpFile = tmp.fileSync();

    const jsonData = JSON.stringify(objArray);
    await fs.writeFile(tmpFile.name, jsonData);

    return tmpFile;
  }

  static async toCSV(objArray: Person[]): Promise<tmp.FileResult> {
    const tmpFile = tmp.fileSync();

    const csvData = this.convertToCSV(objArray, ';');
    await fs.writeFile(tmpFile.name, csvData);

    return tmpFile;
  }

  private static convertToCSV(objArray: Person[], delimiter: string): string {
    const header = Object.keys(objArray[0]).join(delimiter);

    const rows = objArray.map((obj) => Object.values(obj).join(delimiter));

    return header + '\n' + rows.join('\n');
  }

  static async to(format: Format, objArray: any[]): Promise<tmp.FileResult> {
    switch (format) {
      case 'json':
        return await this.toJSON(objArray);
      case 'xlsx':
        return await this.toXLSX(objArray);
      case 'csv':
        return this.toCSV(objArray);
      default:
        throw new Error('unknown format');
    }
  }

  private static flattenSocailNetworksArray(objArray: Person[]): PersonFlattened[] {
    const flattened = objArray.map((person) => {
      const socialNetworkLinks = person.socialNetworkLinks.join(',');

      return { ...person, socialNetworkLinks };
    });

    return flattened;
  }
}
