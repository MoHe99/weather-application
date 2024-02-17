import { FunctionComponent } from 'react';
import { WeatherPredicitonViewProps } from '../types/PropsTypes';

const WeatherPredicitonView: FunctionComponent<WeatherPredicitonViewProps> = ({
	prediction,
}) => {
	return (
		<span>Das Wetter wird nach aktuellen Daten vermutlich {prediction}.</span>
	);
};

export default WeatherPredicitonView;
