import * as fs from 'fs-extra';
import {join} from 'path';
import {Conf} from '../Conf';
import {Context} from '../Context';

export async function setReadmeVersions(_cfg: Conf, ctx: Context): Promise<void> {
  const readmePath = join(ctx.cwd, 'README.md');
  const {log} = ctx.logger;

  let readmeContents: string;
  try {
    readmeContents = await fs.readFile(readmePath, 'utf8');
  } catch {
    log('No README found.');

    return;
  }

  const replacements: any[][] = [
    [/\?branch=([a-z0-9.\-_]+)/ig, `?branch=${ctx.nextRelease.version}`]
  ];

  log('Applying versions to README');
  for (const rpl of replacements) {
    readmeContents = String.prototype.replace.apply(readmeContents, rpl);
  }

  log('Writing updated README.md');
  await fs.writeFile(readmePath, readmeContents);
}
