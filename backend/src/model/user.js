const mongoose = require("mongoose");
const Locations = require("./locations");

const User = mongoose.model('User',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minLength: 3,
    },
    email: {
      type: String,
      required: true,
      minLength: 3,
    },
    password: {
      type: String,
      required: true,
      minLength: 3,
    },
    locations: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Locations'
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

module.exports = User;