import { ChartData, ExtremeValues, ChartOptions } from '../types/ChartsTypes';
import { SensorConfig } from '../types/SensorTypes';
import { WeatherHistory } from '../types/WeatherTypes';

const timestampToReadableDate = (timestamp: number): string => {
	const date = new Date(timestamp);
	const day = date.getDate().toString();
	const month = (date.getMonth() + 1).toString();
	const year = date.getFullYear().toString();
	const hours = date.getHours().toString();
	const minutes = date.getMinutes().toString();

	return `${day}.${month}.${year} ${hours}:${minutes}`;
};

export const generateChartData = (
	historyData: WeatherHistory,
	sensorConfig: SensorConfig,
): ChartData => {
	return {
		labels: historyData.map((datum) =>
			timestampToReadableDate(datum.timestamp),
		),
		datasets: [
			{
				label: sensorConfig.name,
				data: historyData.map((datum) => datum.sensorData[sensorConfig.type]),
				borderColor: sensorConfig.borderColor,
				backgroundColor: sensorConfig.backgroundColor,
			},
		],
	};
};

export const getExtremeValues = (
	sensor: string,
	historyData: WeatherHistory,
): ExtremeValues => {
	const sensorData = historyData.map((datum) => datum.sensorData[sensor]);
	const extremValues: ExtremeValues = {
		min: Math.min(...sensorData),
		max: Math.max(...sensorData),
	};
	return extremValues;
};

export const generateChartOptions = (
	sensorConfig: SensorConfig,
): ChartOptions => {
	return {
		responsive: true,
		scales: {
			y: {
				min: sensorConfig.min,
				max: sensorConfig.max,
			},
		},
	};
};
