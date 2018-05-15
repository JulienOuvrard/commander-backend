var mongoose = require('mongoose');

var DrinkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: Number,
  price: { type: Number, default: 0, required: true },
  currency: { type: String, default: "EUR", required: true },
  created: { type: Date, default: Date.now, required: true },
  updated: { type: Date }
}, {
    autoIndex: true,
    collection: 'drinks'
  });

module.exports = mongoose.model('Drink', DrinkSchema);