import mongoose, { Model } from 'mongoose';
import { WeatherDataSchema } from '../schemes/WeatherDataScheme';
import { SensorData } from '../types/SensorTypes';

export class WeatherRepository {
	private model: Model<SensorData>;

	constructor() {
		this.model = mongoose.model('weatherData', WeatherDataSchema);
	}

	async save(data: SensorData) {
		await this.model.create(data);
	}

	async load() {
		const data = (
			await this.model.find().sort({ timestamp: -1 }).limit(20)
		).reverse();
		return data;
	}
}
