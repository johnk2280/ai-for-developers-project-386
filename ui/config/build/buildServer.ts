import type { ServerOptions } from 'vite';
import type { BuildOptions } from './types/config';

export function buildServer(options: BuildOptions): ServerOptions {
  return { port: options.port };
}
