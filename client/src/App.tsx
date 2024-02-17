import WeatherDataController from './controller/WeatherDataController';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import WeatherStatisticsController from './controller/WeatherStatisticsController';
import WeatherPredicitonController from './controller/WeatherPredictionController';
import WeatherChartsController from './controller/WeatherChartsController';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
);

function App() {
	return (
		<div className='App'>
			<header>
				<h1>Wetter-Daten</h1>
			</header>
			<main>
				<h2>Aktuell:</h2>
				<WeatherDataController />
				<h2>Vorhersage:</h2>
				<WeatherPredicitonController />
				<h2>Statistiken:</h2>
				<WeatherStatisticsController />
				<h2>Verlauf:</h2>
				<WeatherChartsController />
			</main>
			<footer> </footer>
		</div>
	);
}

export default App;
