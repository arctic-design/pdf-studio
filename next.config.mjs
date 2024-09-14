//@ts-check

import { composePlugins, withNx } from '@nx/next';
import { extendTheme, withPigment } from '@pigment-css/nextjs-plugin';
import { createDefaultTheme } from '@arctic-kit/snow';

const lightTheme = createDefaultTheme();
const darkTheme = createDefaultTheme(true);

const theme = extendTheme({
  colorSchemes: {
    light: lightTheme,
    dark: darkTheme,
  },
  cssVarPrefix: 'snow',
  getSelector: (colorScheme) =>
    colorScheme ? `.theme-${colorScheme}` : ':root',
});

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  output: 'export',
  images: {
    unoptimized: true,
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

export default withPigment(composePlugins(...plugins)(nextConfig), {
  theme,
});
