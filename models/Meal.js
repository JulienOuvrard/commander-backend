var mongoose = require('mongoose');

var MealSchema = new mongoose.Schema({
  foods: [mongoose.SchemaTypes.ObjectId],
  price: Number
}, {
  autoIndex: true,
  collection: 'meals'
});

module.exports = mongoose.model('Meal', MealSchema);