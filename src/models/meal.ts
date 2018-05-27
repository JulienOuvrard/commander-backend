import { Schema, Document, SchemaTypes, Model, model } from 'mongoose';

export interface MealInterface {
  foods: [{
    foodId: string;
    name: string;
    quantity: number;
    cooking?: string;
    options?: string[];
  }];
  isPaid: boolean;
  price: number;
  created: Date;
  updated: Date;
}

export interface MealModelInterface extends MealInterface, Document {

}

export var MealSchema = new Schema({
  foods: [{
    foodId: SchemaTypes.ObjectId,
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
    let document = <MealModelInterface>this;
    let now = new Date();
    if (!document.created) {
      document.created = now;
    }
    document.updated = now;
    next();
  }).pre('update', function (next) {
    next();
  });

export const Meal: Model<MealModelInterface> = model<MealModelInterface>('Meal', MealSchema);