import { FunctionComponent } from 'react';
import { WeatherStatisticsViewProps } from '../types/PropsTypes';

const WeatherStatisticsView: FunctionComponent<WeatherStatisticsViewProps> = ({
	statistics,
	sensorConfig,
}) => {
	return (
		<>
			<table className='statistics'>
				<tbody>
					<tr>
						<th className='left'> </th>
						<th>Mittelwert</th>
						<th>Median</th>
						<th className='right'>Standardabweichung</th>
					</tr>
					{sensorConfig.map((sensor) => {
						return (
							<tr>
								<td className='left'>{sensor.name}</td>
								<td>
									{statistics[sensor.type].mean} {sensor.suffix}
								</td>
								<td>
									{statistics[sensor.type].median} {sensor.suffix}
								</td>
								<td className='right'>
									{statistics[sensor.type].standardDeviation} {sensor.suffix}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
};

export default WeatherStatisticsView;
