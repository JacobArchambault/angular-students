/*   database: makewaves    Create, Retrieve, Update, Delete  ---  CRUD    */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())               // <-- angularjs sends json data 
app.use(bodyParser.urlencoded({ extended: true }));

var Student = require('./modules/Student.js');  // our Student model
app.use(express.static('public'))       // serve static files

app.use('/showAll', function (req, res) {   // Retrieve all

	Student.find(function (err, students) {
		if (err) {
			res.status(500).send(err);
		}
		else {
			res.send(students);
		}
	});
})
app.get('/getOne', function (req, res) {     // Retrieve student using sid
	sid = req.query.sid
	Student.findOne({ sid: sid }, function (err, student) {
		if (err) {
			res.status(500).send(err);
		}
		else {
			res.send(student);
		}
	});
})
app.post('/addStudent', function (req, res) {
	new Student({
		sid: req.body.sid,
		last_name: req.body.last_name,
		first_name: req.body.first_name,
		major: req.body.major,
		midterm: 0,        // new student has no scores yet
		final: 0
	}).save(function (err) {
		if (err) {
			res.status(500).send(err);
		}
		else {
			res.send("Student successfully added.");
		}
	});
});
app.post('/updateStudent', function (req, res) {   // Update miles and price
	var update_sid = req.body.sid;    // get posted properties
	Student.findOne({ sid: update_sid }, function (err, student) {
		if (err) {
			res.status(500).send(err);
		}
		else if (!student) {
			res.send('No student with a sid of ' + update_sid);
		}
		else {
			student.midterm = req.body.midterm;
			student.final = req.body.final;
			student.major = req.body.major;

			student.save(function (err) {
				if (err) {
					res.status(500).send(err);
				}
			});
			res.send("Update successful");
		}
	});
});

app.listen(3000, function () {
	console.log('Listening on port 3000, ctrl-c to quit');
});