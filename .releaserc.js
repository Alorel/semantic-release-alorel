module.exports = {
  branch: 'master',
  tagFormat: '${version}',
  prepare: [
    '@semantic-release/changelog',
    require.resolve('./dist'),
    '@semantic-release/npm',
    {
      path: '@semantic-release/git',
      assets: [
        'CHANGELOG.md',
        'package.json',
        'package-lock.json',
        'README.md'
      ]
    }
  ],
  generateNotes: {
    config: '@alorel-personal/conventional-changelog-alorel'
  }
};
