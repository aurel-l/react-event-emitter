module.exports = {
  sourceMaps: 'inline',
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { esmodules: true },
        modules: false,
      },
    ],
    '@babel/preset-typescript',
  ],
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: { node: 'current' },
            useBuiltIns: 'usage',
            corejs: 3,
          },
        ],
      ],
    },
    production: {
      sourceMaps: true,
      presets: ['minify'],
      comments: false,
    },
  },
};
