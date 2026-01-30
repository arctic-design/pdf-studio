/// <reference lib="webworker" />
import { processUploadedFile } from '../lib/pdf-utils';

self.onmessage = async (e: MessageEvent) => {
  const { file, uniqueId, canvas } = e.data;

  const result = await processUploadedFile(file, canvas);

  postMessage({
    ...result,
    uniqueId,
    fileMetaData: { name: file.name, type: file.type },
  });
};
