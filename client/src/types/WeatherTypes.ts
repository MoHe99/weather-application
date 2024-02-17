export type WeatherData = {
	sensorData: Record<string, number>;
	timestamp: number;
};

export type WeatherHistory = WeatherData[];

export type Statistics = {
	mean: number;
	median: number;
	standardDeviation: number;
};

export type SensorStatistics = {
	[key: string]: Statistics;
};
