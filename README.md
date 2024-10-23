# Book Management App

This is a React-based book management application that interacts with a backend API to fetch, create, update, and delete books. The app is deployed using GitHub Pages, and the backend API is configured using environment variables.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [GitHub Actions Pipeline](#github-actions-pipeline)
- [Running the App](#running-the-app)
- [Notes](#notes)

## Features
- List all books
- Create a new book
- Update an existing book
- Delete a book
- Backend availability detection

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/book-vault/frontend.git
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in `.env`:
   ```bash
   REACT_APP_BACKEND_URL=https://your-backend-url
   ```

4. Run the app locally:
   ```bash
   npm start
   ```

## Environment Variables
Make sure to include your backend URL in a `.env` file at the root of your project:
```
REACT_APP_BACKEND_URL=https://backend.bookvault.manish.kr
```

**Note:** All environment variables in React must start with `REACT_APP_`.

## GitHub Actions Pipeline

This pipeline is designed to build the React static pages from the repository and push it to GitHub Pages for static deployment.

```yaml
name: Build and deploy

on:
  push:
    branches:
      - main
  workflow_dispatch:

concurrency:
  group: "pages"
  cancel-in-progress: false

env:
  REACT_APP_BACKEND_URL: ${{ vars.BACKEND_URL }}

jobs:
  build-and-deploy:

    permissions:
      contents: read
      pages: write
      id-token: write

    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    runs-on: ubuntu-latest

    steps:
      - name: checkout the code
        uses: actions/checkout@v4

      - name: Setting up node
        uses: actions/setup-node@v4
        with:
          node-version: 18

      - name: install dependencies
        run: npm install

      - name: build static pages
        run: npm run build

      - name: configure pages
        uses: actions/configure-pages@v3

      - name: upload artifact to github pages
        uses: actions/upload-pages-artifact@v3
        with:
          path: build

      - name: deploy static pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## Running the App

- Run the application:
  ```bash
  npm start
  ```

## Notes

- The **permissions** block in the GitHub Actions pipeline is necessary for the workflow to function properly.
- The **environment** block is required to prevent errors during the "deploy static pages" step.
- The **homepage** field in `package.json` is crucial to avoid a blank screen after deployment.
- All variables in the `.env` file must start with `REACT_APP_` or they won't be read by React.
- Keep the `package-lock.json` up-to-date by running `npm i` regularly.
- Import CSS only in `index.js`.
