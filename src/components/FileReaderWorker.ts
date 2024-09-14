/// <reference lib="webworker" />

const readFileInChunks = (file: File, chunkSize: number) => {
  let offset = 0;
  const reader = new FileReader();
  const chunks: Blob[] = []; // Use Blob to accumulate

  const readChunk = (offset: number) => {
    const chunk = file.slice(offset, offset + chunkSize);
    reader.readAsArrayBuffer(chunk);
  };

  reader.onload = (e: ProgressEvent<FileReader>) => {
    if (e.target && e.target.result) {
      chunks.push(new Blob([e.target.result]));
      offset += chunkSize;
      if (offset < file.size) {
        readChunk(offset);
      } else {
        // Combine all chunks into a single Blob
        const combinedBlob = new Blob(chunks, {
          type: 'application/octet-stream',
        });

        // Convert the Blob to an ArrayBuffer before posting it back
        const responeReader = new FileReader();
        responeReader.onloadend = function () {
          postMessage({
            status: 'complete',
            fileData: responeReader.result,
            fileMetaData: { name: file.name, type: file.type },
          });
        };
        responeReader.readAsArrayBuffer(combinedBlob);
      }
    }
  };

  reader.onerror = () => {
    postMessage({
      status: 'error',
      errorMessage: 'Error in reading the file',
      error: reader.error,
    });
  };

  readChunk(offset);
};

self.onmessage = (e: MessageEvent) => {
  const { file, chunkSize } = e.data;
  readFileInChunks(file, chunkSize);
};
