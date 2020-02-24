# GautingWahl.de

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn data`

Pulls the data from Google Sheet API. Requires env var `REACT_APP_GOOGLE_API_KEY` being set.

## Deployment

Commits to `master` are automatically deployed to the `gh-pages` branch. During the deployment, `yarn data` is run.
