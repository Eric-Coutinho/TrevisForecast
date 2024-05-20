const mongoose = require("mongoose");

const Locations = mongoose.model('Locations',
  new mongoose.Schema({
    nameLocation: {
        type: String,
        required: true,
    },
    lat: {
        type: String,
        required: true
    },
    long: {
        type: String,
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
  })
);

module.exports = Locations;