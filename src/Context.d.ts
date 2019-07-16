/** Execution context */
export interface Context {
  cwd: string;

  logger: Logger;

  nextRelease: { version: string };
}

/** Semantic release logger */
export interface Logger {
  error(...args: any[]): void;

  log(...args: any[]): void;
}
