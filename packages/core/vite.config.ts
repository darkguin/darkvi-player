import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import typescript from '@rollup/plugin-typescript';

const getPath = (path: string) => {
  return fileURLToPath(new URL(path, import.meta.url));
};

export default defineConfig({
  plugins: [
    typescript({
      declaration: true,
      rootDir: getPath('./src'),

      compilerOptions: {
        'plugins': [
          { 'transform': 'typescript-transform-paths', 'useRootDirs': true },
          { 'transform': 'typescript-transform-paths', 'useRootDirs': true, 'afterDeclarations': true },
        ],
      },
    }),
  ],
  build: {
    target: 'esnext',
    lib: {
      entry: getPath('./src/index.ts'),
      name: 'darkvi-core',
      formats: ['es', 'umd', 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
  },
  resolve: {
    alias: [
      { find: '@', replacement: getPath('./src') },
      { find: '@utils', replacement: getPath('./src/utils') },
    ],
  },
  define: {
    'process.env.NODE_ENV': '"production"',
  },
});
