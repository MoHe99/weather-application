import { WeatherData } from '../model/WeatherDataModel';
import { Server } from 'socket.io';
import { WeatherRepository } from '../repository/WeatherRepository';
import { SensorConfig, SensorData } from '../types/SensorTypes';
import { WeatherStatistics } from '../model/WeatherStatisticsModel';
import sensorConfigJSON from '../config/sensor.config.json';
import { SensorFactory } from '../model/sensors/SensorFactory';
import { IObserver } from '../interfaces/IObserver';
import { Predictor } from '../model/WeatherPredictorModel';

export class WeatherDataController implements IObserver<SensorData> {
	private weatherData: WeatherData;
	private predictor: Predictor;
	private repository: WeatherRepository;
	private statistics: WeatherStatistics;
	private socketServer: Server;

	constructor(socketServer: Server) {
		this.socketServer = socketServer;

		const sensors = (sensorConfigJSON as SensorConfig[]).map((sensorConfig) =>
			SensorFactory.createSensor(sensorConfig, 5000),
		);
		this.weatherData = new WeatherData(sensors);
		this.weatherData.registerObserver(this);

		this.repository = new WeatherRepository();
		this.statistics = new WeatherStatistics(
			sensors.map((sensor) => {
				return sensor.getName();
			}),
		);
		this.predictor = new Predictor();
	}

	async update(data: SensorData, source: string) {
		if (source === 'WeatherData') {
			await this.repository.save(data);
			const history = await this.repository.load();
			const statistics = this.statistics.calculateStatistics(history);
			const prediction = this.predictor.predict(data.sensorData.airpressure);

			this.socketServer.emit('weatherData', data);
			this.socketServer.emit('prediction', prediction);
			this.socketServer.emit('weatherHistory', history);
			this.socketServer.emit('weatherStatistics', statistics);
		}
	}

	attachSocketConnections(io: Server) {
		io.on('connection', (socket) => {
			console.info('Client connected');

			socket.on('updateValue', async (sensor: string, value: number) => {
				this.weatherData.setData(sensor, value);
			});

			socket.on('disconnect', () => {
				console.info('Client disconnected');
			});
		});
	}
}
