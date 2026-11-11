const { Schema } = require('mongoose');

const verificacionCorreoSchema = new Schema(
  {
    huella: {
      type: String,
      required: true,
    },

    nonce: {
      type: String,
      required: true,
    },

    creadoEn: {
      type: Date,
      required: true,
    },

    venceEn: {
      type: Date,
      required: true,
    },

    intentos: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  {
    _id: false,
  }
);

module.exports = verificacionCorreoSchema;