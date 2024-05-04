import { drive_v3 } from 'googleapis';

export interface UploadFileResponse extends Pick<drive_v3.Schema$File, 'id' | 'name' | 'webViewLink'> {}
