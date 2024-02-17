import { Prediction } from '../types/PredictionTypes';

export class Predictor {
	private prediction: Prediction;
	private VERY_LOW_VALUE: number;
	private LOW_VALUE: number;
	private HIGH_VALUE: number;
	private VERY_HIGH_VALUE: number;

	constructor() {
		this.VERY_LOW_VALUE = 980;
		this.LOW_VALUE = 1000;
		this.HIGH_VALUE = 1020;
		this.VERY_HIGH_VALUE = 1040;
		this.prediction = Prediction.NoPrediction;
	}

	predict(data: number): Prediction {
		if (data < this.VERY_LOW_VALUE) {
			this.prediction = Prediction.VeryLow;
		} else if (data >= this.VERY_LOW_VALUE && data < this.LOW_VALUE) {
			this.prediction = Prediction.Low;
		} else if (data >= this.LOW_VALUE && data < this.HIGH_VALUE) {
			this.prediction = Prediction.Normal;
		} else if (data >= this.HIGH_VALUE && data < this.VERY_HIGH_VALUE) {
			this.prediction = Prediction.High;
		} else {
			this.prediction = Prediction.VeryHigh;
		}
		return this.prediction;
	}
}
