import { Sensor } from './Sensor';

const testSensorConfig = {
	type: 'test',
	name: 'Test',
	suffix: 'test',
	borderColor: 'rgb(0, 0, 0)',
	backgroundColor: 'rgba(0, 0, 0, 0.5)',
	min: 1,
	max: 100,
	minChange: -1,
	maxChange: 1,
};

const testSensorSendingIntervall = 3000;
const afterTestSensorSendingIntervall = testSensorSendingIntervall + 1000;
const testTimeout = 15000;

describe('Sensors', () => {
	let testSensor: Sensor;

	beforeEach(() => {
		testSensor = new Sensor(testSensorConfig, testSensorSendingIntervall);
	});

	afterEach(() => {
		testSensor.stopUpdates();
	});

	it('should return correct sensor name', () => {
		expect(testSensor.getName()).toEqual('test');
	});

	it('should initialize values correctly', () => {
		const data = testSensor.getData();
		expect(data).toBeGreaterThanOrEqual(testSensorConfig.min);
		expect(data).toBeLessThanOrEqual(testSensorConfig.max);
	});

	it('should update values correctly', (done) => {
		const sensorOldValue = testSensor.getData();
		testSensor.startUpdates();

		setTimeout(() => {
			const data = testSensor.getData();
			expect(data).toBeGreaterThanOrEqual(
				testSensorConfig.minChange + sensorOldValue,
			);
			expect(data).toBeLessThanOrEqual(
				testSensorConfig.maxChange + sensorOldValue,
			);
			done();
		}, afterTestSensorSendingIntervall);
	});

	it('should register and notify observer', (done) => {
		const observer = {
			update: jest.fn(),
		};

		testSensor.registerObserver(observer);
		testSensor.startUpdates();

		setTimeout(() => {
			expect(observer.update).toHaveBeenCalled();
			done();
		}, afterTestSensorSendingIntervall);
	});

	it(
		'should stop notifying observer after removal',
		(done) => {
			const observer = {
				update: jest.fn(),
			};

			testSensor.registerObserver(observer);
			testSensor.startUpdates();

			setTimeout(() => {
				expect(observer.update).toHaveBeenCalled();
				observer.update.mockClear();
				testSensor.removeObserver(observer);

				setTimeout(() => {
					expect(observer.update).not.toHaveBeenCalled();
					done();
				}, afterTestSensorSendingIntervall);
			}, afterTestSensorSendingIntervall);
		},
		testTimeout,
	);

	it(
		'should stop updating values after stopUpdates',
		(done) => {
			const oldData = testSensor.getData();
			testSensor.startUpdates();

			setTimeout(() => {
				expect(testSensor.getData()).not.toEqual(oldData);
				testSensor.stopUpdates();

				const dataAfterStoppingUpdates = testSensor.getData();

				setTimeout(() => {
					expect(testSensor.getData()).toEqual(dataAfterStoppingUpdates);
					done();
				}, afterTestSensorSendingIntervall);
			}, afterTestSensorSendingIntervall);
		},
		testTimeout,
	);
});
