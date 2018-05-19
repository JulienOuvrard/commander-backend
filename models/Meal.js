var mongoose = require('mongoose');

var MealSchema = new mongoose.Schema({
  foods: [{ foodId: mongoose.SchemaTypes.ObjectId, name: { type: String }, cooking: { type: String }, options: [String] }],
  price: Number,
  created: { type: Date, default: Date.now, required: true },
  updated: { type: Date }
}, {
    autoIndex: true,
    collection: 'meals'
  });

module.exports = mongoose.model('Meal', MealSchema);