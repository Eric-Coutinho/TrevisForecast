const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  city: {
    type: String
  },
  country: {
    type: String
  },
  lat: {
    type: Number,
    required: true
  },
  long: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: false,
  },
  deletedAt: {
    type: Date,
    required: false,
  },
});

const LocationModel = mongoose.model('Location', LocationSchema);
module.exports = LocationModel;
