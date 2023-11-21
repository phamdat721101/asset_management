const mongoose = require("mongoose");

const chapterSchema = mongoose.Schema({
  vault_adr:{
    required: true,
    type: String
  },
  vault_name: {
    required: true,
    type: String,
    unique: 1
  },
  manager: {
    required: true,
    type: String,
  },
  vault_desc: {
    required: true,
    type: String
  },
  symbol: {
    required: true,
    type: String
  },
  deposit_asset: {
    required: true,
    type: String
  },
  management_fee:{
    required:true,
    type: Number
  },
  performance_fee:{
    required:true,
    type: Number
  },
  deposit_limit:{
    type: Number
  },
  lockup_time:{
    required: true,
    type: Number
  },
  profit_est:{
    required: true,
    type: Number
  },
  loss_est:{
    required: true,
    type: Number
  }
});

const Chapter = mongoose.model("Vault", chapterSchema);

module.exports = { Chapter };
