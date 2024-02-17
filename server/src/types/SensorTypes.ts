export type SensorData = {
	sensorData: { [key: string]: number };
	timestamp: number;
};

export type SensorConfig = {
	type: string;
	name: string;
	suffix: string;
	borderColor: string;
	backgroundColor: string;
	min: number;
	max: number;
	minChange: number;
	maxChange: number;
};
