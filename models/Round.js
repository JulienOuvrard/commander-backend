var mongoose = require('mongoose');

var RoundSchema = new mongoose.Schema({
  drinks: [{ drinkId: mongoose.SchemaTypes.ObjectId, quantity: {type: Number}}],
  price: Number,
  created: { type: Date, default: Date.now, required: true },
  updated: { type: Date }
}, {
    autoIndex: true,
    collection: 'rounds'
  });

module.exports = mongoose.model('Round', RoundSchema);