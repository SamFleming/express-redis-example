const port = process.env.PORT || 3000;
const express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const app = express();

app.use(session({
	store: new RedisStore({
		host: process.env.REDIS_HOST || 'local.docker',
		prefix: process.env.REDIS_PREFIX || 'connect-redis-test:',
	}),
	secret: 'abc',
	resave: false,
	saveUninitialized: false,
}));

app.get('/', (req, res, next) => {
	if (!req.session) {
		return next(new Error('Unable to connect to Redis'));
	}

	req.session.views = req.session.views || 0;
	req.session.views++;

	res.send(`Page views: ${req.session.views}`);
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}/`);
});
