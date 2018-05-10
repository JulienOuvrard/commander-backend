var mongoose = require('mongoose');

var FoodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: Number,
  price: { type: Number, default: 0, required: true },
  currency: { type: String, default: "EUR", required: true }
}, {
    autoIndex: true,
    collection: 'foods'
  });

module.exports = mongoose.model('Food', FoodSchema);