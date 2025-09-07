# meal-planner-app

A web application designed to help users plan their meals, manage recipes, and organize shopping lists efficiently. Built primarily with TypeScript, this project aims to provide a seamless and intuitive meal planning experience.

## 🌟 Features

### Current

- **Recipe Management:** Add, edit, and organize your favorite recipes.
- **User Authentication:** Secure login and personalized user data.

### Planned

- **Shopping List Generator:** Automatically generate shopping lists based on your planned meals.
- **Ingredient Tracking:** Keep track of ingredients you have and those you need to buy.
- **Responsive Design:** Works beautifully on desktop and mobile devices.
- **Weekly Meal Planning:** Easily create and manage meal plans for each day of the week.
- **Sharing With Friends** Share meal plans and favourite recipes with friends.

## 🛠️ Tech Stack

- **Frontend:** TypeScript, HTML, CSS
- **Framework/Library:** React + Vite
- **Backend/API/Database:** Supabase
- **Deployments** Vercel

## 🗂️ Folder Structure

```
meal-planner-app/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   ├── utils/
│   └── ...
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/gpspence/meal-planner-app.git
   cd meal-planner-app
   ```

2. **Install dependencies:**
   ```bash
   yarn install
   ```

3. **Run the application:**
   ```bash
   yarn start
   ```

4. **Open in your browser:**
   ```
   http://localhost:3000
   ```

### Build

To create a production build:
```bash
npm run build
# or
yarn build
```

## Utility Features

This template comes with the following features:

- [PostCSS](https://postcss.org/) with [mantine-postcss-preset](https://mantine.dev/styles/postcss-preset)
- [TypeScript](https://www.typescriptlang.org/)
- [Storybook](https://storybook.js.org/)
- [Vitest](https://vitest.dev/) setup with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- ESLint setup with [eslint-config-mantine](https://github.com/mantinedev/eslint-config-mantine)

## npm/ yarn scripts

## Build and dev scripts

- `dev` – start development server
- `build` – build production version of the app
- `preview` – locally preview production build

### Testing scripts

- `typecheck` – checks TypeScript types
- `lint` – runs ESLint
- `prettier:check` – checks files with Prettier
- `vitest` – runs vitest tests
- `vitest:watch` – starts vitest watch
- `test` – runs `vitest`, `prettier:check`, `lint` and `typecheck` scripts

### Other scripts

- `storybook` – starts storybook dev server
- `storybook:build` – build production storybook bundle to `storybook-static`
- `prettier:write` – formats all files with Prettier

## 🔨 Contributing

Contributions are welcome! Please open an issue or submit a pull request for any bug fixes, feature requests, or enhancements.

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

## ✉️ Contact

Created by [@gpspence](https://github.com/gpspence)

---

*Happy meal planning!*