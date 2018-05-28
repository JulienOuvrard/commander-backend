"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
function flatten(arr) {
    return Array.prototype.concat(...arr);
}
exports.CommandSchema = new mongoose_1.Schema({
    rounds: [{ type: mongoose_1.SchemaTypes.ObjectId, ref: 'Round' }],
    meals: [{ type: mongoose_1.SchemaTypes.ObjectId, ref: 'Meal' }],
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
    next();
}).pre('update', function (next) {
    next();
});
exports.CommandSchema.methods.description = function () {
    const desc = [];
    desc.push(this.rounds.map(round => {
        return {
            id: round.id,
            type: 'round',
            paid: round.isPaid,
            detail: round.drinks.map(drink => {
                return `(${drink.quantity}) ${drink.name}`;
            }).join(' '),
            price: round.price
        };
    }));
    desc.push(this.meals.map(meal => {
        return {
            id: meal.id,
            type: 'meal',
            paid: meal.isPaid,
            detail: meal.foods.map(food => {
                return `(${food.quantity}) ${food.name}`;
            }).join(' '),
            price: meal.price
        };
    }));
    return flatten(desc);
};
exports.Command = mongoose_1.model('Command', exports.CommandSchema);
//# sourceMappingURL=command.js.map