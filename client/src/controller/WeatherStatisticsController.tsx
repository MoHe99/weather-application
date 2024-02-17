import { useEffect, useState } from 'react';
import { SensorStatistics } from '../types/WeatherTypes';
import { Socket, io } from 'socket.io-client';
import LoadingView from '../view/LoadingView';
import WeatherStatisticsView from '../view/WeatherStatisticsView';
import sensorConfigJSON from '../config/sensor.config.json';
import { Sensor } from '../types/SensorTypes';

const WeatherStatisticsController = () => {
	const [statistics, setStatistics] = useState<SensorStatistics | null>(null);
	const [_socket, setSocket] = useState<Socket | null>(null);
	const [sensorConfig, setSensorConfig] = useState<Sensor[]>([]);

	useEffect(() => {
		setSensorConfig(sensorConfigJSON as Sensor[]);
		const newSocket = io('http://localhost:8080');
		setSocket(newSocket);

		newSocket.on('weatherStatistics', (data) => {
			setStatistics(data);
		});

		return () => {
			newSocket.close();
		};
	}, []);

	if (!statistics) {
		return <LoadingView />;
	}

	return (
		<>
			<WeatherStatisticsView
				statistics={statistics}
				sensorConfig={sensorConfig}
			/>
		</>
	);
};

export default WeatherStatisticsController;
