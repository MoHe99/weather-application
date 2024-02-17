export type SensorSet<T> = Record<string, T>;

export type SensorConfig = {
	type: string;
	name: string;
	suffix: string;
	borderColor: string;
	backgroundColor: string;
	min: number;
	max: number;
};

export type Sensor = {
	type: string;
	name: string;
	suffix: string;
	borderColor: string;
	backgroundColor: string;
	min: number;
	max: number;
};
