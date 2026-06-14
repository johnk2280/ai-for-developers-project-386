import type { UserConfig } from 'vite';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { buildServer } from './buildServer';
import type { BuildOptions } from './types/config';

export function buildViteConfig(options: BuildOptions): UserConfig {
    return {
        plugins: buildPlugins(),
        resolve: buildResolvers(options),
        server: buildServer(options),
        build: { outDir: options.paths.build, target: 'es2022' },
        envPrefix: 'VITE_',
    };
}
