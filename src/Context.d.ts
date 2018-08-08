export interface Context {
  cwd: string;
  logger: Logger;
  nextRelease: { version: string };
}

export interface Logger {
  error(...args: any[]): void;

  log(...args: any[]): void;
}
