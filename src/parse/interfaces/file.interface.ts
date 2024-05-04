import { Format } from './formats.interface';

export interface FileUploadResult {
  format: Format;
  isUploaded: boolean;
  id?: string | null | undefined;
  name?: string | null | undefined;
  link?: string | null | undefined;
}
