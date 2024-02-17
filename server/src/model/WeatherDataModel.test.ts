import { Sensor } from './sensors/emulator/Sensor';
import { WeatherData } from './WeatherDataModel';

const testSensorConfig = {
	type: 'test1',
	name: 'Test 1',
	suffix: 'test',
	borderColor: 'rgb(0, 0, 0)',
	backgroundColor: 'rgba(0, 0, 0, 0.5)',
	min: 1,
	max: 100,
	minChange: -5,
	maxChange: 5,
};

describe('WeatherData', () => {
	let testSensor: Sensor;
	let weatherData: WeatherData;

	beforeEach(() => {
		testSensor = new Sensor(testSensorConfig, 3000);
		weatherData = new WeatherData([testSensor]);
	});

	afterEach(() => {
		testSensor.stopUpdates();
	});

	it('should update values correctly', () => {
		const oldTimestamp = weatherData.getData().timestamp;
		weatherData.update(50, testSensor.getName());
		const newData = weatherData.getData();
		expect(newData.sensorData[testSensor.getName()]).toBe(50);
		expect(newData.timestamp).toBeGreaterThan(oldTimestamp);
	});

	it('should register and remove observer correctly', () => {
		const observer = {
			update: jest.fn(),
		};
		weatherData.registerObserver(observer);
		weatherData.notifyObservers();
		expect(observer.update).toHaveBeenCalled();

		weatherData.removeObserver(observer);
		observer.update.mockClear();
		weatherData.notifyObservers();
		expect(observer.update).not.toHaveBeenCalled();
	});

	it('should set data correctly', () => {
		weatherData.setData(testSensor.getName(), 70);
		const newData = weatherData.getData();
		expect(newData.sensorData[testSensor.getName()]).toBe(70);
	});

	it('should add one day to timestamp correctly', () => {
		const oldTimestamp = weatherData.getData().timestamp;
		weatherData.addOneDayToTimestamp();
		const newTimestamp = weatherData.getData().timestamp;
		const oneDayMilliseconds = 24 * 60 * 60 * 1000;
		expect(oldTimestamp + oneDayMilliseconds).toBe(newTimestamp);
	});
});
