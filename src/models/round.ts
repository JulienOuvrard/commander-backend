import { Schema, Document, SchemaTypes, Model, model } from 'mongoose';

export interface RoundInterface {
  drinks: [{
    drinkId: string;
    name: string;
    quantity: number;
  }];
  isPaid: boolean;
  price: number;
  created: Date;
  updated: Date;
}

export interface RoundModelInterface extends RoundInterface, Document {

}

export var RoundSchema = new Schema({
  drinks: [{ 
    drinkId: SchemaTypes.ObjectId, 
    name: { type: String }, 
    quantity: { type: Number } 
  }],
  isPaid: {type: Boolean},
  price: {type: Number},
  created: { type: Date },
  updated: { type: Date }
}, {
    autoIndex: true,
    collection: 'rounds'
  }).pre('save', function (next) {
    let document = <RoundModelInterface>this
    let now = new Date();
    if (!document.created) {
      document.created = now;
    }
    document.updated = now;
    next();
  }).pre('update', function (next) {
    next();
  });

  export const Round: Model<RoundModelInterface> = model<RoundModelInterface>('Round', RoundSchema);