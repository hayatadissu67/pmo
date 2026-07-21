# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

## Dependencies

- `react` — the main library for building user interfaces in this project.
- `react-dom` — provides DOM-specific methods needed to render React components in the browser.
- `react-router-dom` — adds client-side routing for multi-page navigation within the app.
- `tailwindcss` — utility-first CSS framework used for styling components quickly and consistently.
- `@tailwindcss/vite` — integrates Tailwind CSS with Vite for fast build and development workflows.
- `vite` — the development server and bundler that powers fast reloads and optimized builds.
- `@vitejs/plugin-react` — enables React support in Vite, including JSX transformation and fast refresh.
- `oxlint` — linting tool used to enforce code quality and catch issues early in development.
- `@types/react` and `@types/react-dom` — TypeScript type definitions for React and React DOM, used if you choose to add TypeScript support later.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

