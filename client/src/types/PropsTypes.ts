import { ChangeEvent, FormEvent } from 'react';
import { ChartData, ExtremeValues, ChartOptions } from './ChartsTypes';
import { Sensor, SensorSet } from './SensorTypes';
import { SensorStatistics, WeatherData } from './WeatherTypes';

export type WeatherDataViewProps = {
	weatherData: WeatherData;
	handleTemperatureChange: (event: ChangeEvent<HTMLInputElement>) => void;
	handleTemperatureSubmit: (event: FormEvent<HTMLFormElement>) => void;
	sensorConfig: Sensor[];
};

export type WeatherHistoryViewProps = {
	chartsData: SensorSet<ChartData>;
	chartsOptions: SensorSet<ChartOptions>;
};

export type LineChartProps = {
	yScaleBoundaries: ExtremeValues;
	data: ChartData;
};

export type WeatherPredicitonViewProps = {
	prediction: string;
};

export type WeatherStatisticsViewProps = {
	statistics: SensorStatistics;
	sensorConfig: Sensor[];
};
