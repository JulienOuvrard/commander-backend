var mongoose = require('mongoose');

var CommandSchema = new mongoose.Schema({
  drinks: [mongoose.SchemaTypes.ObjectId],
  meals: [mongoose.SchemaTypes.ObjectId]
}, {
  autoIndex: true,
  collection: 'commands'
});

module.exports = mongoose.model('Command', CommandSchema);