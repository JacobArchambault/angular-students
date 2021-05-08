var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/CIT301');  // db name = cars4sale

module.exports = mongoose.model('Student', new mongoose.Schema({
	sid: { type: Number, required: true, min: 1000, max: 9999, unique: true },
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	midterm: { type: Number, min: 0, max: 100, required: true },
	final: { type: Number, min: 0, max: 100, required: true },
	major: { type: String, required: true },
}));


