db = db.getSiblingDB('weatherData');

db.createUser({
	user: 'user',
	pwd: 'password',
	roles: [
		{
			role: 'readWrite',
			db: 'weatherData',
		},
	],
});
