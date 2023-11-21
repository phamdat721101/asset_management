const mongoose = require("mongoose");

const chapterSchema = mongoose.Schema({
  vaultAdr:{
    required: true,
    type: String
  },
  vaultName: {
    required: true,
    type: String,
    unique: 1
  },
  manager: {
    required: true,
    type: String,
    unique: 1
  },
  vaultDesc: {
    required: true,
    type: String
  },
  symbol: {
    required: true,
    type: String
  },
  depositAsset: {
    required: true,
    type: String
  },
  managementFee:{
    required:true,
    type: Number
  },
  depositLimit:{
    type: Number
  },
  lockupTime:{
    required: true,
    type: Number
  }
});

const Chapter = mongoose.model("Chapter", chapterSchema);

module.exports = { Chapter };
