import { Schema, Document, SchemaTypes, Model, model } from 'mongoose';

export interface FoodInterface {
  name: string;
  quantity: number;
  price: number;
  currency: string;
  needCooking: boolean;
  hasIngredients: boolean;
  created: Date;
  updated: Date;
}

export interface FoodModelInterface extends FoodInterface, Document {

}

export var FoodSchema: Schema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  price: { type: Number, default: 0, required: true },
  needCooking: { type: Boolean, default: false, required: true },
  hasIngredients: { type: Boolean, default: false, required: true },
  currency: { type: String, default: "EUR", required: true },
  created: { type: Date },
  updated: { type: Date }
}, {
    autoIndex: true,
    collection: 'foods'
  }).pre('save', function (next) {
    let document = <FoodModelInterface>this
    let now = new Date();
    if (!document.created) {
      document.created = now;
    }
    document.updated = now;
    next();
  }).pre('update', function (next) {
    next();
  });

export const Food: Model<FoodModelInterface> = model<FoodModelInterface>('Food', FoodSchema);