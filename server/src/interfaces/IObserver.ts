export interface IObserver<T> {
	update(data: T, observableName: string): void;
}

export interface IObservable<T> {
	registerObserver(observer: IObserver<T>): void;
	removeObserver(observer: IObserver<T>): void;
	notifyObservers(): void;
}
