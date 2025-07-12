
module.exports = {
  input: ['src/**/*.{js,jsx,ts,tsx}'],
  output: './',
  options: {
    debug: false,
    removeUnusedKeys: true,
    func: {
      list: ['t', 'i18next.t', 'i18n.t'],
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    keySeparator: '.',
    nsSeparator: ':',
    interpolation: {
      prefix: '{{',
      suffix: '}}'
    }
  },
  resource: {
    loadPath: 'public/locales/{{lng}}/{{ns}}.json',
    savePath: 'public/locales/{{lng}}/{{ns}}.json',
    jsonIndent: 2,
    lineEnding: '\n'
  }
};
