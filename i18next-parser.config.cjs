module.exports = {
  locales: ['fr'],
  defaultNamespace: 'translation',
  output: 'public/locales/$LOCALE/$NAMESPACE.json',
  input: ['src/**/*.{ts,tsx}'],
  keySeparator: false,
  nsSeparator: false,
  defaultValue: (locale, _namespace, key) => (locale === 'fr' ? '' : key),
  lexers: {
    ts: ['JavascriptLexer'],
    tsx: ['JsxLexer'],
  },
};
