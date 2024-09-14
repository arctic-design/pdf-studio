/// <reference lib="webworker" />
import { processUploadedFile } from './FileUtility';

self.onmessage = async (e: MessageEvent) => {
  const { file, uniqueId, canvas } = e.data;

  const respone = await processUploadedFile(file, uniqueId, canvas);

  postMessage({
    ...respone,
    fileMetaData: { name: file.name, type: file.type },
  });
};
