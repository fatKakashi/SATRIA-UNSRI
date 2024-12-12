const mongoose = require("mongoose");

const accountsSchema = new mongoose.Schema({
  username: String,
  password: String,
  nim: String,
});

const AccountsModel = mongoose.model("account", accountsSchema);


module.exports = AccountsModel;