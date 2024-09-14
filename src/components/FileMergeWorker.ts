/// <reference lib="webworker" />
import { mergePDFs } from './FileUtility';

self.onmessage = async (e: MessageEvent) => {
  const { files } = e.data;

  const mergeResponse = await mergePDFs(files);

  postMessage({ ...mergeResponse });
};
