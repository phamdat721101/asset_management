const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const investSchema = mongoose.Schema({
  assetId: {
    required: true,
    type: String,
    unique: true
  },
  owner: {
    required: true,
    type: String,
    unique: true
  },
  investContract: {
    required: true,
    type: String
    // unique: 1
  },
  transactionHash: {
    required: true,
    type: String
  }
});

const Investment = mongoose.model("Investment", investSchema);

module.exports = { Investment };
