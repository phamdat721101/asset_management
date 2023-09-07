const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const assetSchema = mongoose.Schema({
  assetId: {
    required: true,
    type: String,
    unique: true
  },
  transactionHash: {
    required: true,
    type: String,
    unique: true
  },
  chapterName: {
    required: true,
    type: String
  },
  assetName: {
    required: true,
    type: String
    // unique: 1
  },
  description: {
    required: true,
    type: String
  },
  bBenefits: {
    type: String,
    required: true
  },
  gitHubLink: {
    type: String,
    required: true
  },
  imgLink: {
    type: String
  },
  amount: {
    type: Number
  }
});

const Asset = mongoose.model("Asset", assetSchema);

module.exports = { Asset };
