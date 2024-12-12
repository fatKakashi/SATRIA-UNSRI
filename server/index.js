const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const AccountsModel = require("./models/Accounts");
const StudentsModel = require("./models/Students");

const app = express();
app.use(express.json());
app.use(cors());
 
mongoose
  .connect("mongodb://localhost:27017/SATRIA_UNSRI")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error));

app.post("/", (req, res) => {
  const { username, password } = req.body;
  console.log("Request body: ", req.body);

  AccountsModel.findOne({ username: username }).then((user) => {
    console.log("User found: ", user);
    if (user) {
      if (user.password === password) {
        res.send({ message: "Login success", username: user.username, nim: user.nim });
      } else {
        res.send({ message: "Password is incorrect" });
      }
    } else {
      res.send({ message: "User not found" });
    }
  });
});

app.get("/checkdatamahasiswa/:username", (req, res) => {
  const { username } = req.params;
  StudentsModel.findOne({ nim: username }).then((student) => {
    if (student) {
      console.log("Student found: ", student);
      res.send(student);
    } else {
      res.status(404).send({ message: "Student not found" });
    }
  }).catch((error) => {
    res.status(500).send({ message: "An error occurred", error });
  });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});



