var mongoose = require('mongoose');

var MealSchema = new mongoose.Schema({
  foods: [mongoose.SchemaTypes.ObjectId],
  price: Number,
  created: { type: Date, default: Date.now, required: true },
  updated: { type: Date }
}, {
    autoIndex: true,
    collection: 'meals'
  });

module.exports = mongoose.model('Meal', MealSchema);