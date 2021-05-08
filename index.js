/*   database: makewaves    Create, Retrieve, Update, Delete  ---  CRUD    */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())               // <-- angularjs sends json data 
app.use(bodyParser.urlencoded({ extended: true }));

var Car = require('./modules/Car.js');  // our Car model
app.use(express.static('public'))       // serve static files

app.use('/showAll', function (req, res) {   // Retrieve all

	Car.find(function (err, cars) {
		if (err) {
			res.status(500).send(err);
		}
		else {
			res.send(cars);
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
	var newStudent = new Student({
		sid: req.body.sid,
		last_name: req.body.last_name,
		first_name: req.body.first_name,
		major: req.body.major,
		midterm: 0,        // new student has no scores yet
		final: 0
	});

	newStudent.save(function (err) {
		if (err) {
			res.status(500).send(err);
		}
		else {
			res.send("Student successfully added.");
		}
	});
});
app.post('/updateCar', function (req, res) {   // Update miles and price
	var update_cid = req.body.cid;    // get posted properties
	Car.findOne({ cid: update_cid }, function (err, car) {
		if (err) {
			res.status(500).send(err);
		}
		else if (!car) {
			res.send('No car with a cid of ' + update_cid);
		}
		else {
			car.miles = req.body.miles;
			car.price = req.body.price;

			car.save(function (err) {
				if (err) {
					res.status(500).send(err);
				}
			});
			res.send("Update successful");
		}
	});
});

app.get('/deleteCar', function (req, res) {   //  Delete
	var delete_cid = req.query.cid;
	Car.findOneAndRemove({ cid: delete_cid }, function (err, car) {  // 
		if (err) {
			res.status(500).send(err);
		}
		else if (!car) {
			res.send('No car with a cid of ' + delete_cid);
		}
		else {
			res.send("Car cid: " + delete_cid + " deleted.");
		}
	});
});

app.listen(3000, function () {
	console.log('Listening on port 3000, ctrl-c to quit');
});