const mongoose = require('mongoose');

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please A Valid Password is Required'],
      trim: true,
      unique: true
    },
    body: {
      type: String,
      required: [true, 'Body Is Required!💀']
    },
    description: {
      type: String,
      trim: true
    },
    state: {
      type: Boolean,
      required: [true, 'Publish State is Require, State is Required'],
      default: false
    },
    read_count: {
      type: Number,
      default: 0
    },
    reading_time: {
      type: Number,
      required: true
    },
    tags: {
      type: Array,
      default: []
    },
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Users',
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Blog', blogSchema);
