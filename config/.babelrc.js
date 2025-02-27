module.exports = {
  presets: [
    [
      require.resolve('@babel/preset-env'),
      {
        targets: {
          node: '13',
        },
      },
    ],
  ],
  plugins: [
    require.resolve('babel-plugin-syntax-trailing-function-commas'),
    require.resolve('@babel/plugin-proposal-object-rest-spread'),
    require.resolve('babel-plugin-inline-import'),
  ],
};
