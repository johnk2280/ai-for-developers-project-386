import type { AliasOptions, ResolveOptions } from 'vite';
import type { BuildOptions } from './types/config';

export function buildResolvers(options: BuildOptions): ResolveOptions & { alias?: AliasOptions } {
  const { paths } = options;
  return {
    extensions: ['.tsx', '.jsx', '.js', '.ts'],
    alias: {
      '@': paths.src,
      '@pages': paths.pages,
      '@shared': paths.shared,
      '@widgets': paths.widgets,
      '@entities': paths.entities,
      '@features': paths.features,
      '@assets': paths.assets,
    },
  };
}
