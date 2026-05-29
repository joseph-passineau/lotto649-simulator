<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/joseph-passineau/lotto649-simulator">
    <img src="public/pwa-192x192.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Lotto 6/49 lottery simulator</h3>

  <p align="center">
    This is a lottery simulator of the Loto-Quebec 6/49 lottery game
    <br />
    <a href="https://lotto649.passineau.ca/"><strong>View Demo</strong></a>
    <br />
    <br />
    <a href="https://github.com/joseph-passineau/lotto649-simulator/issues">Report Bug</a>
    ·
    <a href="https://github.com/joseph-passineau/lotto649-simulator/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

### Built With

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Chart.js](https://www.chartjs.org/) / [react-chartjs-2](https://react-chartjs-2.js.org/)
- [Vitest](https://vitest.dev/)
- [i18next](https://www.i18next.com/) / [react-i18next](https://react.i18next.com/)
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) (offline installable app)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 20+ (LTS recommended)
- npm (comes with Node)

### Install

```sh
git clone <repository-url>
cd lotto649-simulator
npm install
```

### Development

```sh
npm run dev
```

Open the URL shown in the terminal (default [http://localhost:5173](http://localhost:5173)).

### Test

```sh
npm run test:run
```

### Production build

```sh
npm run build
npm run preview
```

`npm run preview` serves the `dist/` folder locally so you can smoke-test the production build and PWA.

### Optional: regenerate PWA icons

After changing `public/favicon.svg`:

```sh
npm run pwa:assets
```

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

This project was inspired by UK Lottery Simulator by The Watchful Eyes\
[UK Lottery Simulator](https://www.reddit.com/r/CasualUK/comments/t74tg6/uk_lottery_simulator_playing_the_lottery_1000/)

### Others

- [Best README Template](https://github.com/othneildrew/Best-README-Template)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/joseph-passineau/lotto649-simulator.svg?style=for-the-badge
[contributors-url]: https://github.com/joseph-passineau/lotto649-simulator/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/joseph-passineau/lotto649-simulator.svg?style=for-the-badge
[forks-url]: https://github.com/joseph-passineau/lotto649-simulator/network/members
[stars-shield]: https://img.shields.io/github/stars/joseph-passineau/lotto649-simulator.svg?style=for-the-badge
[stars-url]: https://github.com/joseph-passineau/lotto649-simulator/stargazers
[issues-shield]: https://img.shields.io/github/issues/joseph-passineau/lotto649-simulator.svg?style=for-the-badge
[issues-url]: https://github.com/joseph-passineau/lotto649-simulator/issues
[license-shield]: https://img.shields.io/github/license/joseph-passineau/lotto649-simulator.svg?style=for-the-badge
[license-url]: https://github.com/joseph-passineau/lotto649-simulator/blob/master/LICENSE.txt
[product-screenshot]: images/screenshot.png
