import {expect} from 'chai';
import * as fs from 'fs-extra';
import {join} from 'path';
import * as uuid from 'uuid';
import {setReadmeVersions} from '../src/prepare/setReadmeVersions';

describe('setReadmeVersions', () => {
  let readmeFixturePath: string;
  let readmeFixture: string;
  let cwd: string;
  let fixtureOutPath: string;
  let version: string;
  let newReadme: string;

  before('init', async() => {
    readmeFixturePath = join(__dirname, 'fixtures', 'README.md');
    cwd = __dirname;
    fixtureOutPath = join(cwd, 'README.md');
    readmeFixture = await fs.readFile(readmeFixturePath, 'utf8');
    version = uuid.v4();
    await fs.writeFile(fixtureOutPath, readmeFixture);
  });

  before('run', async() => {
    await setReadmeVersions({}, {
      cwd,
      logger: {
        error: function() {
          console.error.apply(console, arguments);
        },
        log: function() {
          console.log.apply(console, arguments);
        }
      },
      nextRelease: {version}
    });
  });

  before('read', async() => {
    newReadme = await fs.readFile(fixtureOutPath, 'utf8');
  });

  describe('/\\?branch=([a-z0-9.\\-_]+)/ig', () => {
    it('travis-ci', () => {
      const str = `https://travis-ci.com/Alorel/semantic-release-alorel.svg?branch=${version}`;
      expect(newReadme).to.contain(str);
    });

    describe('coveralls', () => {
      it('svg', () => {
        const str = `https://coveralls.io/repos/github/Alorel/semantic-release-alorel/badge.svg?branch=${version}`;
        expect(newReadme).to.contain(str);
      });
      it('svg', () => {
        const str = `https://coveralls.io/github/Alorel/semantic-release-alorel?branch=${version}`;
        expect(newReadme).to.contain(str);
      });
    });
  });

  after('cleanup', async() => {
    try {
      await fs.unlink(fixtureOutPath);
    } catch {
      //noop
    }
  });
});
