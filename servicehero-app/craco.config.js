const CracoLessPlugin = require('craco-less');
const { AntCracoTheme } = require('./src/styles/theme.craco.js');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: AntCracoTheme(),
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
