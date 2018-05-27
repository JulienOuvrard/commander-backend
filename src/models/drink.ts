import { Schema, Document, SchemaTypes, Model, model } from 'mongoose';

export interface DrinkInterface {
  name: string;
  quantity: number;
  price: number;
  currency: string;
  created: Date;
  updated: Date;
}

export interface DrinkModelInterface extends DrinkInterface, Document {

}

export var DrinkSchema: Schema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  price: { type: Number, default: 0, required: true },
  currency: { type: String, default: "EUR", required: true },
  created: { type: Date },
  updated: { type: Date }
}, {
    autoIndex: true,
    collection: 'drinks'
  }).pre('save', function (next) {
    let document = <DrinkModelInterface>this
    let now = new Date();
    if (!document.created) {
      document.created = now;
    }
    document.updated = now;
    next();
  }).pre('update', function (next) {
    next();
  });

export const Drink: Model<DrinkModelInterface> = model<DrinkModelInterface>('Drink', DrinkSchema);