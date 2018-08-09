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
    [
      /\?branch=([a-z0-9.\-_]+)/ig,
      `?branch=${ctx.nextRelease.version}`
    ],
    [
      /img\.shields\.io\/travis(\/com)?\/([a-z0-9-_.]+)\/([a-z0-9-_.]+)\/([a-z0-9-_.]+)\.([a-z]{2,4})/ig,
      'img.shields.io/travis$1/$2/$3/my-branch.$5'
    ],
    [
      /img\.shields\.io\/coveralls\/github\/([a-z0-9-_.]+)\/([a-z0-9-_.]+)\/([a-z0-9-_.]+)\.([a-z]{2,4})/ig,
      'img.shields.io/coveralls/github/$1/$2/my-branch.$4'
    ]
  ];

  log('Applying versions to README');
  for (const rpl of replacements) {
    readmeContents = String.prototype.replace.apply(readmeContents, rpl);
  }

  log('Writing updated README.md');
  await fs.writeFile(readmePath, readmeContents);
}
