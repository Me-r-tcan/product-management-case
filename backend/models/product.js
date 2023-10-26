const mongoose = require('mongoose');

const movementSchema = new mongoose.Schema(
  {
    movementDescription: { type: String },
    entryExitAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
    },
    description: {
      type: String,
    },
    code: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    movements: [movementSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
