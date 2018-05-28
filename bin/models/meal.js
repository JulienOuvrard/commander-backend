"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.MealSchema = new mongoose_1.Schema({
    foods: [{
            foodId: mongoose_1.SchemaTypes.ObjectId,
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            cooking: { type: String },
            options: [String]
        }],
    isPaid: { type: Boolean, required: true, default: false },
    price: { type: Number, required: true, default: 0 },
    created: { type: Date },
    updated: { type: Date }
}, {
    autoIndex: true,
    collection: 'meals'
}).pre('save', function (next) {
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
exports.MealSchema.methods.description = function () {
    return this.foods.map(curr => {
        return `(${curr.quantity}) ${curr.name} ${curr.cooking ? `[${curr.cooking}]` : ``}`;
    }).join(', ');
};
exports.Meal = mongoose_1.model('Meal', exports.MealSchema);
//# sourceMappingURL=meal.js.map