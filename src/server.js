const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const middleware = require('../middleware/auth');
const firebase = require('firebase-admin');
const app = express();
const port = 5000;


app.use(cors({ credentials: true }));
app.use(bodyParser());
app.use(middleware.decodeToken);

app.post('/tasks', cors(), (req, res) => {
	writeUserData(req.user.uid, req.user.name, req.user.email, req.user.picture.replace('=s96', '=s150'), req.body.tasks);
	res.status(200).json({ message: "successful" });
	res.end();
});

app.get('/tasks', (req, res) => {
	const ref = firebase.database().ref('users/' + req.user.uid + '/tasks');
	ref.on('value', (tasks) => {
		return res.json(snapshotToArray(tasks));
	}, (errorObject) => {
		console.log('The read failed: ' + errorObject.name);
	});

});

app.listen(port, () => {
	console.log(`server is running on port ${port}`);
});
function writeUserData(userId, name, email, imageUrl, tasks) {
	const ref = firebase.database().ref('users/' + userId);
	ref.set({
		username: name,
		email: email,
		profile_picture: imageUrl,
		tasks: tasks
	});
}
function snapshotToArray(snapshot) {
	var returnArr = [];

	snapshot.forEach(function (childSnapshot) {
		var item = childSnapshot.val();
		item.key = childSnapshot.key;

		returnArr.push(item);
	});

	return returnArr;
};
