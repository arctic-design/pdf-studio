import { MAX_CANVAS_POOL_SIZE } from './constants';

class CanvasPool {
  private available: HTMLCanvasElement[] = [];
  private inUse = new Set<HTMLCanvasElement>();

  acquire(): HTMLCanvasElement {
    let canvas = this.available.pop();
    if (!canvas) {
      canvas = document.createElement('canvas');
    }
    this.inUse.add(canvas);
    return canvas;
  }

  release(canvas: HTMLCanvasElement): void {
    if (!this.inUse.has(canvas)) return;
    this.inUse.delete(canvas);

    if (this.available.length < MAX_CANVAS_POOL_SIZE) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      this.available.push(canvas);
    }
  }

  clear(): void {
    this.available = [];
    this.inUse.clear();
  }

  get activeCount(): number {
    return this.inUse.size;
  }

  get poolSize(): number {
    return this.available.length;
  }
}

export const canvasPool = new CanvasPool();
