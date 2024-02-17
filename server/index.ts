import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { WeatherDataController } from './src/controller/WeatherController';
import cors from 'cors';
import { connectToDatabase } from './src/config/MongooseConfig';

const app = express();
const server = createServer(app);
const io = new Server(server);

const weatherDataController = new WeatherDataController(io);

app.use(cors());

weatherDataController.attachSocketConnections(io);

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
	connectToDatabase();
	console.info(`Server is running on port ${PORT}`);
});
