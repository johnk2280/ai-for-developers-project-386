import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import circleDependency from 'vite-plugin-circular-dependency';
import { visualizer } from 'rollup-plugin-visualizer';
import type { PluginOption } from 'vite';

export function buildPlugins(): PluginOption[] {
  return [
    svgr(),
    react(),
    tsconfigPaths(),
    circleDependency({ outputFilePath: './circleDep' }),
    visualizer({ open: false, template: 'treemap', gzipSize: true }),
  ];
}
