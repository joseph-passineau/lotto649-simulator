import { defineConfig } from 'i18next-cli';

export default defineConfig({
  locales: ['fr'],
  extract: {
    input: ['src/**/*.{ts,tsx}'],
    output: 'public/locales/{{language}}/{{namespace}}.json',
    defaultNS: 'translation',
    keySeparator: false,
    nsSeparator: false,
    defaultValue: (key, _namespace, language) => (language === 'fr' ? '' : key),
    functions: ['t', '*.t'],
    transComponents: ['Trans'],
  },
});