"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.CommandSchema = new mongoose_1.Schema({
    rounds: [mongoose_1.SchemaTypes.ObjectId],
    meals: [mongoose_1.SchemaTypes.ObjectId],
    name: { type: String },
    price: { type: Number, required: true, default: 0 },
    isPaid: { type: Boolean, required: true, default: false },
    created: { type: Date },
    updated: { type: Date }
}, {
    autoIndex: true,
    collection: 'commands'
}).pre("save", function (next) {
    let document = this;
    let now = new Date();
    if (!document.created) {
        document.created = now;
    }
    document.updated = now;
}).pre('update', function (next) {
    next();
});
exports.CommandSchema.methods.description = function () {
    return '';
};
exports.Command = mongoose_1.model('Command', exports.CommandSchema);
//# sourceMappingURL=command.js.map