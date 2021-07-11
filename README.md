# Cosuno Challenge

This is my submission for the Cosuno coding challenge.
The code is tested on latest Node 14, 15 and 16 
__Using npm version >= 7 is important__ for workspaces to work. If you are using npm < 7, you have to alter some of the commands described here accordingly.

## Overview
The project makes use of the following tools:
### Client
* __React (using create react app)__ as SPA framework
* __Theme-UI__ Design framework
### Server
* __express__ (+ cors middleware)

## Setup
To setup this project, just run one command in the root directory (the directory where this readme is located):
`npm install`

This will setup the server and the client workspace.

## Start the project for development
In order to use this project, you have to start the backend and the frontend.
The quickest way, is to use the development start commands.

### Start backend server
The backend is pretty minimal and using express. Run this command to start the backend:
`npm run start -w=server`

### Start frontend SPA
The frontend is based on create-react-app. To start the SPA run:
`npm run start -w=client`

## Testing
This project uses __Cypress for e2e testing__. To run the tests, just run:
`npm run test`

or open the cypress app:
`npm run test:open`

__The client and the SPA have to run for the tests to succeed.__

## Building
Building is pretty similar to starting the development mode.

It will transpile the Typescript to Javascript:
`npm run build -w=server -w=client`

For both projects, the Javascript files will be in a `./build` folder.

## Docker
There are Dockerfiles for the client and the server project. 

### Building
You can build both, by simply running:
`npm run build:docker -w=server -w=client`

or use `docker compose`:

`docker-compose build`

The docker images tags will be `cosuno-client` and `cosuno-server`
The `cosuno-client` is a multi-stage build, which builds the javascript files in the first stage and configures a Ngnix container after that, wich will deliver the files, when the container gets started.

If you want to change the api url, you have to build the client package with a custom build arg: 
```
cd client
docker build --build-arg API_URL=http://custom-api.com . -t cosuno-client
```

### Start containers
The most simple way to get the docker setup running, is using `docker-compose`:
`docker-compose up -d`

Alternatively you can of cause just start both container using `docker run`

__Client:__
`docker run -p 80:80 cosuno-client`
__Server:__
`docker run -p 8080:8080 cosuno-server`

## Clean up code
To clean up your code, just run:
`npm run prettier`

## Improvement suggestions
* There could be a penalty to start the request or something similar, when typing in the search field, so that there are not so much request fired while typing (this problem of cause only exists in the serverside search).
* There could be better doc blocks for components / functions with parameter descriptions etc.
* The design is surely not the best. More work could be done there.
* The `utils.ts` is present in the server and the client workspace. Both are pretty similar. It would be possible to create a libs-workspace or something like that, to eliminate nearly duplicate code.
* There could be more tests for edge cases or tests in general.
* Prettier is present to ensure a good code style. ESLint could also be added to notify for bad practices and similar problems.
* Prettier is using the default rules without any config. This may not be optimal in the long run.
* I really like the combination of [huskey](https://github.com/typicode/husky) hooks with prettier and/or ESLint, which I haven't done here. It ensures, that code is always committed fell formatted.
* The project is already set up for usage in CI/CD. You can change the api endpoint with a docker build arg, so adding a configuration for a gitlab/github runner or smth similar would be an improvement.