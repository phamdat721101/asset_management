const mongoose = require("mongoose");

const chapterSchema = mongoose.Schema({
  vaultName: {
    required: true,
    type: String,
    unique: 1
  },
  owner: {
    required: true,
    type: String,
    unique: 1
  },
  vaultDesc: {
    required: true,
    type: String
  }
});

const Chapter = mongoose.model("Chapter", chapterSchema);

module.exports = { Chapter };
