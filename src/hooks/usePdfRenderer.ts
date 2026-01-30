'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { useDocumentStore } from '../stores/useDocumentStore';

let pdfjsLib: typeof import('pdfjs-dist') | null = null;

async function getPdfjsLib() {
  if (!pdfjsLib) {
    pdfjsLib = await import('pdfjs-dist');
    // Use statically copied worker from public directory
    pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
  }
  return pdfjsLib;
}

export function usePdfRenderer() {
  const documentCache = useRef<Map<string, PDFDocumentProxy>>(new Map());
  const [isLoading, setIsLoading] = useState(false);

  const getSourceFileBytes = useDocumentStore((s) => s.getSourceFileBytes);

  const loadDocument = useCallback(
    async (sourceFileId: string): Promise<PDFDocumentProxy | null> => {
      if (documentCache.current.has(sourceFileId)) {
        return documentCache.current.get(sourceFileId)!;
      }

      const bytes = getSourceFileBytes(sourceFileId);
      if (!bytes) return null;

      setIsLoading(true);
      try {
        const lib = await getPdfjsLib();
        const doc = await lib.getDocument({ data: bytes.slice(0) }).promise;
        documentCache.current.set(sourceFileId, doc);
        return doc;
      } catch (err) {
        console.error('Failed to load PDF document:', err);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [getSourceFileBytes]
  );

  const renderPage = useCallback(
    async (
      sourceFileId: string,
      pageIndex: number,
      canvas: HTMLCanvasElement,
      scale: number,
      rotation = 0
    ): Promise<boolean> => {
      const doc = await loadDocument(sourceFileId);
      if (!doc) return false;

      try {
        const page = await doc.getPage(pageIndex + 1); // pdf.js uses 1-based indexing
        const viewport = page.getViewport({ scale, rotation });

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const ctx = canvas.getContext('2d');
        if (!ctx) return false;

        await page.render({ canvasContext: ctx, viewport }).promise;
        return true;
      } catch (err) {
        console.error('Failed to render page:', err);
        return false;
      }
    },
    [loadDocument]
  );

  const renderThumbnail = useCallback(
    async (
      sourceFileId: string,
      pageIndex: number,
      scale = 0.3,
      rotation = 0
    ): Promise<string | null> => {
      const doc = await loadDocument(sourceFileId);
      if (!doc) return null;

      try {
        const page = await doc.getPage(pageIndex + 1);
        const viewport = page.getViewport({ scale, rotation });

        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const ctx = canvas.getContext('2d');
        if (!ctx) return null;

        await page.render({ canvasContext: ctx, viewport }).promise;
        return canvas.toDataURL('image/jpeg', 0.7);
      } catch (err) {
        console.error('Failed to render thumbnail:', err);
        return null;
      }
    },
    [loadDocument]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      documentCache.current.forEach((doc) => doc.destroy());
      documentCache.current.clear();
    };
  }, []);

  return { loadDocument, renderPage, renderThumbnail, isLoading };
}
