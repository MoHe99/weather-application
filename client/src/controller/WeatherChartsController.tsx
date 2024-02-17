import { useEffect, useState } from 'react';
import { WeatherHistory } from '../types/WeatherTypes';
import { Socket, io } from 'socket.io-client';
import { ChartData, ChartOptions } from '../types/ChartsTypes';
import {
	generateChartData,
	generateChartOptions,
} from '../helper/ChartsHelper';
import LoadingView from '../view/LoadingView';
import { Sensor, SensorSet } from '../types/SensorTypes';
import WeatherHistoryView from '../view/WeatherChartsView';
import sensorConfigJSON from '../config/sensor.config.json';

const WeatherChartsController = () => {
	const [chartsData, setChartsData] = useState<SensorSet<ChartData> | null>(
		null,
	);
	const [chartsOptions, setChartsOptions] =
		useState<SensorSet<ChartOptions> | null>(null);
	const [historyData, setHistoryData] = useState<WeatherHistory | null>(null);
	const [_socket, setSocket] = useState<Socket | null>(null);
	const [sensorConfig, setSensorConfig] = useState<Sensor[]>([]);

	useEffect(() => {
		setSensorConfig(sensorConfigJSON as Sensor[]);
		const newSocket = io('http://localhost:8080');
		setSocket(newSocket);

		newSocket.on('weatherHistory', (data) => {
			setHistoryData(data);
		});

		return () => {
			newSocket.close();
		};
	}, []);

	useEffect(() => {
		if (historyData && sensorConfig) {
			const newChartsOptions: SensorSet<ChartOptions> = {};
			const newChartsData: SensorSet<ChartData> = {};

			sensorConfig.map((sensor) => {
				newChartsOptions[sensor.type] = generateChartOptions(sensor);
				newChartsData[sensor.type] = generateChartData(historyData, sensor);
			});

			setChartsOptions(newChartsOptions);
			setChartsData(newChartsData);
		}
	}, [historyData, sensorConfig]);

	if (!(chartsData && chartsOptions)) {
		return <LoadingView />;
	}

	return (
		<>
			<WeatherHistoryView
				chartsData={chartsData}
				chartsOptions={chartsOptions}
			/>
		</>
	);
};

export default WeatherChartsController;
