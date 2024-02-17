import { ISensor } from '../interfaces/ISensor';
import { IObservable, IObserver } from '../interfaces/IObserver';
import { SensorData } from '../types/SensorTypes';

export class WeatherData implements IObserver<number>, IObservable<SensorData> {
	private data: SensorData;
	private changeTracker: { [sensorName: string]: boolean };
	private sensors: ISensor[];
	private observers: IObserver<SensorData>[] = [];

	constructor(sensors: ISensor[]) {
		this.sensors = sensors;
		this.data = {
			sensorData: {},
			timestamp: Date.now(),
		};
		this.changeTracker = {};
		for (const sensor of this.sensors) {
			this.changeTracker[sensor.getName()] = false;
		}
		this.addOneDayToTimestamp();

		for (const sensor of this.sensors) {
			this.data.sensorData[sensor.getName()] = sensor.getData();
			sensor.startUpdates();
			sensor.registerObserver(this);
		}
	}

	update(data: number, sensorName: string): void {
		this.data.sensorData[sensorName] = data;
		this.changeTracker[sensorName] = true;

		let allUpdated = true;
		for (const sensor of this.sensors) {
			if (!this.changeTracker[sensor.getName()]) {
				allUpdated = false;
				break;
			}
		}
		if (allUpdated) {
			this.addOneDayToTimestamp();
			this.notifyObservers();

			for (const sensor of this.sensors) {
				this.changeTracker[sensor.getName()] = false;
			}
		}
	}

	getData(): SensorData {
		return this.data;
	}

	setData(key: string, value: number): void {
		this.data.sensorData[key] = value;
		this.addOneDayToTimestamp();
		this.notifyObservers();
	}

	addOneDayToTimestamp(): void {
		const oneDayMilliseconds = 24 * 60 * 60 * 1000;
		this.data.timestamp += oneDayMilliseconds;
	}

	registerObserver(observer: IObserver<SensorData>): void {
		this.observers.push(observer);
	}

	removeObserver(observer: IObserver<SensorData>): void {
		const index = this.observers.indexOf(observer);
		if (index !== -1) {
			this.observers.splice(index, 1);
		}
	}

	notifyObservers(): void {
		for (const observer of this.observers) {
			observer.update(this.data, 'WeatherData');
		}
	}
}
