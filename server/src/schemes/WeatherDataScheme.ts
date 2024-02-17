import { Schema } from 'mongoose';
import { SensorData } from '../types/SensorTypes';

export const WeatherDataSchema = new Schema<SensorData>({
	sensorData: { type: Schema.Types.Mixed, required: true },
	timestamp: { type: Number, required: true, default: Date.now() },
});
