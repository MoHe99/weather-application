export type SensorStatistics = {
	[key: string]: Statistics;
};

export type Statistics = {
	mean: number;
	median: number;
	standardDeviation: number;
};
