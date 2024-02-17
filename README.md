# Weather Application
This project was part of my examination performance in the "Software Engineering" module of my Bachelor's degree. The task was to create an application that displays weather data from sensors, whereby the sensors were to be simulated. There was to be a sensor for humidity, temperature and air pressure. It should also be possible to make an additional input for the temperature. The data should be displayed in a suitable form. 

It was important that the application was written in the MVC pattern and used other software patterns. For example, I used the "Observer Pattern" and the "Factory Pattern". The application should first be modeled with UML in a class diagram and then implemented. In addition, unit tests were to be created for all important classes.

My final grade in the module "Software Engineering" was 1.0.

## Prerequisites:
Before you begin, ensure you have

- node v18
- docker
- make
- pnpm

installed on your system. These tools are necessary for installing dependencies and running the application locally.

## Getting started

Follow these steps to set up and launch the Weather Application on your local system:

1. **Clone repository**
Clone the repository to your local machine using the following command:
`git clone `

2. **Install dependencies**
Navigate to the cloned repository directory and install all required dependencies:

cd weather-application/client && pnpm i && cd ../server && pnpm i && cd ..

3. **Start the development environment**
Launch the development server using `make start`. This command builds all containers and starts them (including watching for file changes).

After the server has started, you can visit `http://localhost:3000` and start testing the app.

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

> [!IMPORTANT]
> This project serves as a showcase project and was part of my Bachelor's degree. It's not aimed at wide distribution or commercial use. Feedback, and suggestions are welcome.
