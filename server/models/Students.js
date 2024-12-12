const mongoose = require('mongoose');

const studentsSchema = new mongoose.Schema({
    name: String,
    nim: String,
    major: String,
});

const StudentsModel = mongoose.model('student', studentsSchema);

module.exports = StudentsModel; 