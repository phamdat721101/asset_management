const mongoose = require("mongoose");

const chapterSchema = mongoose.Schema({
  chapterName: {
    required: true,
    type: String,
    unique: 1
  },
  chapterDescription: {
    required: true,
    type: String
  }
});

const Chapter = mongoose.model("Chapter", chapterSchema);

module.exports = { Chapter };
