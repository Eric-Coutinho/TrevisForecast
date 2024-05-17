const mongoose = require("mongoose");

const User = mongoose.model('User',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minLenght: 3,
    },
    email: {
      type: String,
      required: true,
      minLenght: 3,
    },
    password: {
      type: String,
      required: true,
      minLenght: 3,
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