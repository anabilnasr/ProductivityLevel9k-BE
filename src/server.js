const express = require('express');
const cors = require('cors');
const middleware = require('../middleware/auth');

const app = express();
const port = 5000;

app.use(cors());

app.use(middleware.decodeToken);

app.get('/api/todos', (req, res) => {
	return res.json({
		tasks: [
			{
				title: 'Task1',
				description: '5alas el backend ya lalaa'
			},
			{
				title: 'Task2',
				description: '5alas el frontend ya lalaa'
			},
			{
				title: 'Task3',
				description: '5alas el authentication ya lalaa'
			},
			{
				title: 'Task4',
				description: '5alas el Assignment ya lalaa'
			},
		],
	});
});

app.listen(port, () => {
	console.log(`server is running on port ${port}`);
});
