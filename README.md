# Typing Speed Test

A simple typing speed test built with vanilla HTML, CSS, and JavaScript. Host it for free on [GitHub Pages](https://pages.github.com/).

## Project structure

```
typing-speed-test/
├── index.html
├── styles.css
├── app.js
├── texts.js
├── .gitignore
└── README.md
```

## Run locally

Open `index.html` in a browser, or serve the folder with any static server:

```bash
npx serve .
```

## Deploy to GitHub Pages

1. Create a new GitHub repository and push this project.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Choose the `main` branch and `/ (root)` folder.
5. Save. Your site will be live at `https://<username>.github.io/<repo-name>/`.

No build step is required — GitHub Pages serves the files as-is.

## Features

- Live WPM and accuracy
- 30 / 60 / 120 second durations
- Character-by-character feedback
- Test ends when time runs out or the passage is completed
