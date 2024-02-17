import { SensorConfig } from '../../types/SensorTypes';
import { ISensor } from '../../interfaces/ISensor';
import { Sensor } from './emulator/Sensor';

export class SensorFactory {
	static createSensor(config: SensorConfig, intervall: number): ISensor {
		return new Sensor(config, intervall);
	}
}
