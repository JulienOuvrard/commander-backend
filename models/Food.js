var mongoose = require('mongoose');

var FoodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  price: { type: Number, default: 0, required: true },
  needCooking: Boolean,
  hasIngredients: Boolean,
  currency: { type: String, default: "EUR", required: true },
  created: { type: Date, default: Date.now, required: true },
  updated: { type: Date, default: Date.now }
}, {
    autoIndex: true,
    collection: 'foods'
  });

module.exports = mongoose.model('Food', FoodSchema);