//@ts-check

import { composePlugins, withNx } from '@nx/next';

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    svgr: false,
  },
  output: 'export',
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    // Prevent pdf.js worker from being processed by webpack
    config.resolve.alias['pdfjs-dist/build/pdf.worker.mjs'] = false;
    config.resolve.alias['pdfjs-dist/build/pdf.worker.min.mjs'] = false;
    return config;
  },
};

const plugins = [withNx];

export default composePlugins(...plugins)(nextConfig);
