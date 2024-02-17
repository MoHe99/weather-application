import { useState, useEffect } from 'react';
import { Socket, io } from 'socket.io-client';
import WeatherDataView from '../view/WeatherDataView';
import { WeatherData } from '../types/WeatherTypes';
import LoadingView from '../view/LoadingView';
import { FormEvent, ChangeEvent } from 'react';
import sensorConfigJSON from '../config/sensor.config.json';
import { Sensor } from '../types/SensorTypes';

const WeatherDataController = () => {
	const [weatherData, setWeatherData] = useState<WeatherData>();
	const [socket, setSocket] = useState<Socket | null>(null);
	const [newTemperature, setNewTemperature] = useState('');
	const [sensorConfig, setSensorConfig] = useState<Sensor[]>([]);

	const handleTemperatureChange = (event: ChangeEvent<HTMLInputElement>) => {
		setNewTemperature(event.target.value);
	};

	const handleTemperatureSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		updateValue('temperature', parseFloat(newTemperature));
	};

	useEffect(() => {
		setSensorConfig(sensorConfigJSON as Sensor[]);
		const newSocket = io('http://localhost:8080');
		setSocket(newSocket);

		newSocket.on('weatherData', (data) => {
			setWeatherData(data);
		});

		return () => {
			newSocket.close();
		};
	}, []);

	const updateValue = (sensor: string, value: number) => {
		if (socket) {
			socket.emit('updateValue', sensor, value);
		}
	};

	if (!weatherData) {
		return <LoadingView />;
	}

	return (
		<>
			<WeatherDataView
				weatherData={weatherData}
				handleTemperatureChange={handleTemperatureChange}
				handleTemperatureSubmit={handleTemperatureSubmit}
				sensorConfig={sensorConfig}
			/>
		</>
	);
};

export default WeatherDataController;
