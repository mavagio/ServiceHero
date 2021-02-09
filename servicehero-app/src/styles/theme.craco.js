const Theme = require('./theme');

const AntCracoTheme = () => {
  const res = {};
  Object.entries(Theme).forEach(([key, value]) => (res['@' + key] = value));
  return res;
};

module.exports.AntCracoTheme = AntCracoTheme;
