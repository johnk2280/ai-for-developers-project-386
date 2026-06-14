import path from 'path';
import { defineConfig } from 'vite';
import { buildViteConfig } from './config/build/buildViteConfig';
import type { BuildPaths } from './config/build/types/config';

const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'main.tsx'),
    build: path.resolve(__dirname, 'dist'),
    src: path.resolve(__dirname, 'src'),
    pages: path.resolve(__dirname, 'src/pages'),
    widgets: path.resolve(__dirname, 'src/widgets'),
    entities: path.resolve(__dirname, 'src/entities'),
    features: path.resolve(__dirname, 'src/features'),
    shared: path.resolve(__dirname, 'src/shared'),
    assets: path.resolve(__dirname, 'src/shared/assets'),
};

const isDev = process.env.NODE_ENV !== 'production';

export default defineConfig(
    buildViteConfig({ mode: process.env.NODE_ENV ?? 'development', paths, isDev, port: 5173 }),
);
