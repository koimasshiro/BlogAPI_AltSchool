const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Please enter your Email address'],
      trim: true,
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid Email address'
      ]
    },
    image: {
      type: String,
      default: ''
    },
    password: {
      type: String,
      required: [true, 'Please A Valid Password is Required'],
      select: false
    },
    firstname: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'Please enter a Valid First Name']
    },
    lastname: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'Please enter a Valid Last Name']
    }
  },
  {
    timestamps: true
  }
);

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return enteredPassword == this.password;
};

// Sign JWT
userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    {
      user_id: this._id
    },
    process.env.JWT_SECRET
  );
};

module.exports = mongoose.model('Users', userSchema);
