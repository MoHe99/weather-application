import { FunctionComponent } from 'react';
import { WeatherDataViewProps } from '../types/PropsTypes';

const WeatherDataView: FunctionComponent<WeatherDataViewProps> = ({
	weatherData,
	handleTemperatureChange,
	handleTemperatureSubmit,
	sensorConfig,
}) => {
	const renderSensorData = () => {
		return sensorConfig.map((sensor) => {
			return (
				<tr key={sensor.type}>
					<td className='left'>{sensor.name}</td>
					<td className='right'>
						{weatherData.sensorData[sensor.type]?.toFixed(2)} {sensor.suffix}
					</td>
				</tr>
			);
		});
	};

	return (
		<>
			<table className='current-data'>
				<tbody>{renderSensorData()}</tbody>
			</table>
			<form onSubmit={handleTemperatureSubmit}>
				<label>Manuelle Temperatur-Eingabe:</label>
				<input type='number' onChange={handleTemperatureChange} />
				<input type='submit' value='Submit' />
			</form>
		</>
	);
};

export default WeatherDataView;
