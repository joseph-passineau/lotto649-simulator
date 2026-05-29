import {
  defineConfig,
  minimal2023Preset,
} from '@vite-pwa/assets-generator/config';

const appBackground = '#0b0f1a';

export default defineConfig({
  headLinkOptions: {
    preset: '2023',
  },
  preset: {
    ...minimal2023Preset,
    maskable: {
      sizes: [512],
      padding: 0.1,
      resizeOptions: { background: appBackground, fit: 'contain' },
    },
    apple: {
      sizes: [180],
      padding: 0.1,
      resizeOptions: { background: appBackground, fit: 'contain' },
    },
  },
  images: ['public/favicon.svg'],
});
