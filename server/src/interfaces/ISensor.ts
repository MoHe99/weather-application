import { IObservable } from './IObserver';

export interface ISensor extends IObservable<number> {
	getName(): string;
	getData(): number;
	setData(value: number): void;
	startUpdates(): void;
	stopUpdates(): void;
}
