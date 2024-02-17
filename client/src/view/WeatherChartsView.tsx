import { FunctionComponent } from 'react';
import { WeatherHistoryViewProps } from '../types/PropsTypes';
import { Line } from 'react-chartjs-2';

const WeatherHistoryView: FunctionComponent<WeatherHistoryViewProps> = ({
	chartsData,
	chartsOptions,
}) => {
	return (
		<div className='diagrams'>
			{Object.keys(chartsData).map((key) => (
				<div className='chart-wrapper' key={key}>
					<Line options={chartsOptions[key]} data={chartsData[key]} />
				</div>
			))}
		</div>
	);
};

export default WeatherHistoryView;
