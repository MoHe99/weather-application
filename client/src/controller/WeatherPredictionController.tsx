import { useEffect, useState } from 'react';
import WeatherPredictionView from '../view/WeatherPredictionView';
import { Socket, io } from 'socket.io-client';
import LoadingView from '../view/LoadingView';

const WeatherPredicitonController = () => {
	const [prediction, setPrediction] = useState('');
	const [_socket, setSocket] = useState<Socket | null>(null);

	useEffect(() => {
		const newSocket = io('http://localhost:8080');
		setSocket(newSocket);

		newSocket.on('prediction', (data) => {
			setPrediction(data.slice(-20));
		});

		return () => {
			newSocket.close();
		};
	}, []);

	if (!prediction) {
		return <LoadingView />;
	}

	return <WeatherPredictionView prediction={prediction} />;
};

export default WeatherPredicitonController;
