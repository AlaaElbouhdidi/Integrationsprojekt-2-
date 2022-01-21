# MateTeam

MateTeam is a team management site for you and your friends.

* Manage your own groups or join existing
* Decide easier on dates with polls
* Manage events and form teams to persist results

View production build at <https://mate-team.de>

View documentation at <https://europe-west1-mate-team.cloudfunctions.net/api/docs/mate-team/index.html>


## Installation

Run the following commands for the installation of this project

```
npm i -g nx
npm i -g firebase-tools
npm install
```

This project is using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="150"></p>

For more informations on [Nx](https://nx.dev) please visit the following links:

* [Nx Documentation](https://nx.dev/angular)
* [10-minute video showing all Nx features](https://nx.dev/getting-started/intro)
* [Interactive Tutorial](https://nx.dev/tutorial/01-create-application)


## Development

For development in this project please read the contributing guide [here](CONTRIBUTING.md).

To start the development server run:

```
npm run client:start:dev
```

The server is now available with hot reloading on port ``4200``.


## Build

Run `npm run all:build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `npm run all:test` to execute the unit tests via [Jest](https://jestjs.io).

Run `npm run affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `npm run all:e2e` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `npm run affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `npm run deps` to see a diagram of the dependencies of this projects.

## Documentation

An automatically generated documentation of this project is available at:

<https://europe-west1-mate-team.cloudfunctions.net/api/docs/mate-team/index.html>

To generate this documentation locally run `npm run all:doc`




