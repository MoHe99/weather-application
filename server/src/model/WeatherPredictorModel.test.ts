import { Prediction } from '../types/PredictionTypes';
import { Predictor } from './WeatherPredictorModel';

const LESS_THAN_VERY_LOW_VALUE = 979;
const LESS_THAN_LOW_VALUE = 999;
const LESS_THAN_HIGH_VALUE = 1019;
const LESS_THAN_VERY_HIGH_VALUE = 1039;
const VERY_HIGH_VALUE = 1040;

describe('Predictor', () => {
	let predictor: Predictor;

	beforeEach(() => {
		predictor = new Predictor();
	});

	it('should return correct prediction for very low value', () => {
		expect(predictor.predict(LESS_THAN_VERY_LOW_VALUE)).toEqual(
			Prediction.VeryLow,
		);
	});

	it('should return correct prediction for low value', () => {
		expect(predictor.predict(LESS_THAN_LOW_VALUE)).toEqual(Prediction.Low);
	});

	it('should return correct prediction for normal value', () => {
		expect(predictor.predict(LESS_THAN_HIGH_VALUE)).toEqual(Prediction.Normal);
	});

	it('should return correct prediction for high value', () => {
		expect(predictor.predict(LESS_THAN_VERY_HIGH_VALUE)).toEqual(
			Prediction.High,
		);
	});

	it('should return correct prediction for very high value', () => {
		expect(predictor.predict(VERY_HIGH_VALUE)).toEqual(Prediction.VeryHigh);
	});
});
