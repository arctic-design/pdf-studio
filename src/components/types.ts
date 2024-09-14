export type RedactFile = {
  originalFile: File;
  totalPages: number;
  id: string;
};

export enum ItemTypes {
  File = 'File',
}

export type CheckedFileType = { [key: string]: boolean };
