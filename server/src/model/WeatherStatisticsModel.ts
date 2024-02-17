import { SensorData } from '../types/SensorTypes';
import { SensorStatistics } from '../types/StatisticsTypes';

export class WeatherStatistics {
	private sensorNames: string[];
	private data: SensorStatistics;

	constructor(sensorNames: string[]) {
		this.sensorNames = sensorNames.map((sensorName) => {
			return sensorName;
		});
		this.data = {};
		for (const sensor of this.sensorNames) {
			this.data[sensor] = {
				mean: 0,
				median: 0,
				standardDeviation: 0,
			};
		}
	}

	calculateStatistics(history: SensorData[]) {
		for (const sensor of this.sensorNames) {
			const data = history.map((datum) => {
				return datum.sensorData[sensor];
			});
			this.data[sensor].mean = this.medianOf(data);
			this.data[sensor].median = this.meanOf(data);
			this.data[sensor].standardDeviation = this.standardDeviationOf(data);
		}
		return this.data;
	}

	private meanOf(data: number[]) {
		let sum = 0;

		for (const datum of data) {
			sum += datum;
		}

		const mean = Math.round((sum / data.length) * 100) / 100;
		return mean;
	}

	private medianOf(data: number[]) {
		data.sort();
		let median = 0;
		if (data.length % 2 === 0) {
			const m1 = data[Math.floor((data.length - 1) / 2)];
			const m2 = data[Math.floor(data.length / 2)];
			median = (m1 + m2) / 2;
		} else {
			median = data[Math.floor((data.length - 1) / 2)];
		}
		median = Math.round(median * 100) / 100;
		return median;
	}

	private standardDeviationOf(data: number[]) {
		let sum = 0;
		const mean = this.meanOf(data);

		for (const datum of data) {
			sum += (datum - mean) ** 2;
		}
		const variance = sum * (1 / data.length);
		const standardDeviation = Math.round(Math.sqrt(variance) * 100) / 100;
		return standardDeviation;
	}
}
