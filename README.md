# TQ Built

Marketing single-page website built with React + Vite.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## i18n

- Default language is Arabic (`dir="rtl"`).
- Language toggle is available in the top navigation.
- Translations are stored in:
  - `src/translations/ar.js`
  - `src/translations/en.js`

## Design assets

- Premium section imagery is bundled locally under `public/images/`.
- Components reference these local files directly so production does not depend on external image hotlinks.

## GitHub Pages deployment

- Vite base path is configured for project pages: `/TQ_Built/`.
- Workflow file: `.github/workflows/deploy-pages.yml`.
- In **Settings → Pages**, set **Source** to **GitHub Actions** (not “Deploy from a branch”).
- On pushes to `main`, GitHub Actions builds the app and deploys the `dist` folder to GitHub Pages.
