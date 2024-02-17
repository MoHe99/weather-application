import mongoose from 'mongoose';

export async function connectToDatabase() {
	try {
		await mongoose.connect('mongodb://user:password@mongodb:27017/weatherData');
		console.info('Connected to MongoDB');
	} catch (err) {
		console.error('Error connecting to MongoDB', err);
	}
}
