import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],      // خروجی CommonJS و ES Module
  dts: true,                    // فایل‌های تعریف تایپ (.d.ts)
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  target: 'es2020',
});