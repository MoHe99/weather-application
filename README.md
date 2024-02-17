# Technical:

## Prerequisites:

- Make sure you have installed node v18.9.0
- Make sure you have installed Docker (on Linux) or Docker Desktop on Windows/ Mac
- Make sure you have installed Make
- Make sure you have installed pnpm (`npm i -g pnpm`)

When you have all prerequisites just run `make rebuild` to start the application.

### Install Make:

MacOS:

- `xcode-select --install`

Linux/ Ubuntu:

- `sudo apt-get install build-essential`

Windows:

- First: Install Chocolatey with this guide https://chocolatey.org/install#individual
- Then: `choco install make`

## Node-Modules:

Install existing: `pnpm i` in root, /server and /backend.\
Install new/ uninstall: Execute `pnpm add MODULENAME` in the shell of the corresponding local directory and make a rebuild.

Uninstall module: Execute `pnpm remove MODULENAME` in the shell of the corresponding directory and rebuild.

NOTE: If you are in development and don't want to rebuild your application, you can run the pnpm (un)installation also a second time inside the shell of the \
corresponding docker-container to have the module instantly in your running application (use `docker-compose exec SERVICENAME`, to enter the shell of the corresponding service).

## Docker-Compose Commands

| Command                                             | Description                                         |
| --------------------------------------------------- | --------------------------------------------------- |
| `docker-compose up --build`                         | Build and start the application in development mode |
| `ENV_MODE=Dockerfile.dev docker-compose up --build` | Build and start the application in production mode  |
| `docker-compose up`                                 | Start the application                               |
| `Press ctrl+c to stop the application`              | Stop the application                                |
| `docker-compose down --rmi all --remove-orphans -v` | Completely remove the application                   |
| `docker-compose exec SERVICENAME`                   | Enter the Docker shell of a service                 |

## Make Commands

| Command                  | Description                                                     |
| ------------------------ | --------------------------------------------------------------- |
| `make dev`               | Completely rebuild the application in development mode          |
| `make prod`              | Completely rebuild the application in production/ compiled mode |
| `make stop`              | Stop the application containers                                 |
| `make start`             | Start the application containers                                |
| `make destroy`           | Completely destroy the application                              |
| `make logs`              | Show the Docker logs of the application                         |
| `make logs-SERVICENAME`  | Show the Docker logs of a specific service                      |
| `make shell-SERVICENAME` | Enter the Docker shell of a specific service                    |
| `make ps`                | Show an overview of the application containers                  |
| `make lint`              | Run the rome linter to check for linter errors                  |
| `make format`            | Run the rome formatter                                          |

## Access

| Service  | URL                   | Credentials |
| -------- | --------------------- | ----------- |
| Frontend | http://localhost:3000 | N/A         |
| Backend  | http://localhost:8080 | N/A         |
