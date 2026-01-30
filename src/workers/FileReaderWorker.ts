/// <reference lib="webworker" />

self.onmessage = async (e: MessageEvent) => {
  const { file } = e.data as { file: File; chunkSize: number };

  try {
    const fileData = await file.arrayBuffer();
    postMessage({
      status: 'complete',
      fileData,
      fileMetaData: { name: file.name, type: file.type },
    });
  } catch {
    postMessage({
      status: 'error',
      errorMessage: 'Error in reading the file',
    });
  }
};
