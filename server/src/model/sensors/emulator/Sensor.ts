import { IObservable, IObserver } from '../../../interfaces/IObserver';
import { SensorConfig } from '../../../types/SensorTypes';
import { ISensor } from '../../../interfaces/ISensor';

export class Sensor implements ISensor, IObservable<number> {
	readonly SENSOR_NAME: string;
	readonly MAX_CHANGE_DATA: number;
	readonly MIN_CHANGE_DATA: number;
	readonly MIN_DATA: number;
	readonly MAX_DATA: number;
	readonly INTERVAL: number;
	private currentValue: number;
	private observers: IObserver<number>[] = [];
	private intervalId: NodeJS.Timer | null;

	constructor(config: SensorConfig, intervall: number) {
		this.INTERVAL = intervall;
		this.SENSOR_NAME = config.type;
		this.MIN_DATA = config.min;
		this.MAX_DATA = config.max;
		this.MIN_CHANGE_DATA = config.minChange;
		this.MAX_CHANGE_DATA = config.maxChange;
		this.intervalId = null;
		this.currentValue = this.generateRandomValueInRange(
			this.MIN_DATA,
			this.MAX_DATA,
		);
	}

	registerObserver(observer: IObserver<number>) {
		this.observers.push(observer);
	}

	removeObserver(observer: IObserver<number>): void {
		const index = this.observers.indexOf(observer);
		if (index !== -1) {
			this.observers.splice(index, 1);
		}
	}

	notifyObservers() {
		for (const observer of this.observers) {
			observer.update(this.getData(), this.SENSOR_NAME);
		}
	}

	startUpdates() {
		this.intervalId = setInterval(() => {
			this.updateData();
			this.getData();
		}, this.INTERVAL);
	}

	updateData() {
		const randomData =
			this.currentValue +
			this.generateRandomValueInRange(
				this.MIN_CHANGE_DATA,
				this.MAX_CHANGE_DATA,
			);
		const dataInRange = Math.min(
			Math.max(randomData, this.MIN_DATA),
			this.MAX_DATA,
		);
		this.setData(dataInRange);
		this.notifyObservers();
	}

	stopUpdates() {
		if (this.intervalId) {
			clearInterval(this.intervalId as NodeJS.Timeout);
		}
	}

	getData() {
		return this.currentValue;
	}

	setData(value: number) {
		this.currentValue = value;
	}

	getName() {
		return this.SENSOR_NAME;
	}

	private generateRandomValueInRange(min: number, max: number) {
		const unroundedValue = Math.random() * (max - min) + min;

		let roundedValue;
		if (unroundedValue > 0) {
			roundedValue = Math.floor(unroundedValue * 100) / 100;
		} else {
			roundedValue = Math.ceil(unroundedValue * 100) / 100;
		}
		return roundedValue;
	}
}
