const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const MahasiswaModel = require("./models/Mahasiswa");

const app = express();
app.use(express.json());
app.use(cors());
 
mongoose
  .connect("mongodb://localhost:27017/siswa")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error));

app.post("/", (req, res) => {
  const { username, password } = req.body;
  console.log("Request body: ", req.body);

  MahasiswaModel.findOne({ username: username }).then((user) => {
    console.log("User found: ", user);
    if (user) {
      if (user.password === password) {
        res.send({ message: "Login success" });
      } else {
        res.send({ message: "Password is incorrect" });
      }
    } else {
      res.send({ message: "User not found" });
    }
  });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});



