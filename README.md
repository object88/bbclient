# Brighter, Blacker

Brighter, Blacker (BB) is a photo portfolio web application, meant to be used in conjunction with [bbservice](https://github.com/object88/bbservice).

## Architecture

On the client side, BB uses React to manage component rendering, and Relay to manage state & data fetching.

## Technical goals

* Use Google services to authenticate a user via SSO
* Transform relay's strange object shape into something more friendly towards react proptypes.

## Note
This application requires the schema file from `bbservice` to be copied to `/schema/schema.json`.

#### Front end
* ES6 via [Babel](https://babeljs.io/)
* [React](https://facebook.github.io/react/)
* [Relay](https://facebook.github.io/relay/)

#### Quality
* [ESLint](http://eslint.org/)
* [Flow](https://flowtype.org/)
* [Webpack](https://webpack.js.org/)

#### Package management
* [Yarn](https://yarnpkg.com/)
