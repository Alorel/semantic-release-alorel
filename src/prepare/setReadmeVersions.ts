import * as fs from 'fs-extra';
import {join} from 'path';
import {Conf} from '../Conf';
import {Context} from '../Context';

/**
 * Set badge versions on README.md
 * @param _cfg Configuration
 * @param ctx Runtime context
 */
export async function setReadmeVersions(_cfg: Conf, ctx: Context): Promise<void> {
  const readmePath = join(ctx.cwd, 'README.md');
  const {log} = ctx.logger;
  const v = ctx.nextRelease.version;

  log('Reading README.md');
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
      `?branch=${v}`
    ],
    [
      /@([0-9]+\.[0-9]+\.[0-9]+)\)/ig,
      `@${v})`
    ],
    [
      /img\.shields\.io\/travis(\/com)?\/([a-z0-9-_.]+)\/([a-z0-9-_.]+)\/([a-z0-9-_.]+)\.([a-z]{2,4})/ig,
      `img.shields.io/travis$1/$2/$3/${v}.$5`
    ],
    [
      /img\.shields\.io\/coveralls\/github\/([a-z0-9-_.]+)\/([a-z0-9-_.]+)\/([a-z0-9-_.]+)\.([a-z]{2,4})/ig,
      `img.shields.io/coveralls/github/$1/$2/${v}.$4`
    ],
    [
      /jsdelivr\.net\/npm\/([a-z\-0-9]+)@[a-z0-9\.]+/ig,
      `jsdelivr.net/npm/$1@${v}`
    ]
  ];

  for (let i = 0; i < replacements.length; i++) {
    log(`Applying replacement ${i + 1} to README`);
    readmeContents = String.prototype.replace.apply(readmeContents, <any>replacements[i]);
  }

  log('Writing updated README.md');
  await fs.writeFile(readmePath, readmeContents);
  log('Done');
}
