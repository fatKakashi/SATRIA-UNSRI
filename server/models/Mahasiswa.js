const mongoose = require("mongoose");

const mahasiswaSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const MahasiswaModel = mongoose.model("mahasiswa", mahasiswaSchema);


module.exports = MahasiswaModel;