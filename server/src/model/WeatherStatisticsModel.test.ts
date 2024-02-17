import { SensorData } from '../types/SensorTypes';
import { SensorStatistics } from '../types/StatisticsTypes';
import { WeatherStatistics } from './WeatherStatisticsModel';

const data: SensorData[] = [
	{ sensorData: { test: 5 }, timestamp: 0 },
	{ sensorData: { test: 6 }, timestamp: 1 },
	{ sensorData: { test: 2 }, timestamp: 2 },
	{ sensorData: { test: 4 }, timestamp: 3 },
	{ sensorData: { test: 1 }, timestamp: 4 },
	{ sensorData: { test: 3 }, timestamp: 5 },
];

const reducedData: SensorData[] = [
	{ sensorData: { test: 3 }, timestamp: 0 },
	{ sensorData: { test: 2 }, timestamp: 1 },
	{ sensorData: { test: 4 }, timestamp: 2 },
	{ sensorData: { test: 1 }, timestamp: 3 },
	{ sensorData: { test: 5 }, timestamp: 4 },
];

describe('Weather Statistics', () => {
	let weatherStatistics: WeatherStatistics;
	let stats: SensorStatistics;

	beforeEach(() => {
		weatherStatistics = new WeatherStatistics(['test']);
	});

	it('should calc correct mean', () => {
		stats = weatherStatistics.calculateStatistics(data);
		expect(stats.test.mean).toBe(3.5);
		stats = weatherStatistics.calculateStatistics(reducedData);
		expect(stats.test.mean).toBe(3);
	});

	it('should calc correct median', () => {
		stats = weatherStatistics.calculateStatistics(data);
		expect(stats.test.median).toBe(3.5);
		stats = weatherStatistics.calculateStatistics(reducedData);
		expect(stats.test.median).toBe(3);
	});

	it('should calc correct standard deviation', () => {
		stats = weatherStatistics.calculateStatistics(data);
		expect(stats.test.standardDeviation).toBe(1.71);
		stats = weatherStatistics.calculateStatistics(reducedData);
		expect(stats.test.standardDeviation).toBe(1.41);
	});
});
