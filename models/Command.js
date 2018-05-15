var mongoose = require('mongoose');

var CommandSchema = new mongoose.Schema({
  drinks: [mongoose.SchemaTypes.ObjectId],
  meals: [mongoose.SchemaTypes.ObjectId],
  name: { type: String },
  price: Number,
  isPaid: Boolean,
  created: { type: Date, default: Date.now, required: true },
  updated: { type: Date }
}, {
    autoIndex: true,
    collection: 'commands'
  });

module.exports = mongoose.model('Command', CommandSchema);