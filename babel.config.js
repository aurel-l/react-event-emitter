module.exports = {
  sourceMaps: 'inline',
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { esmodules: true },
        modules: false,
        useBuiltIns: 'usage',
        corejs: 3,
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
    },
  },
};
