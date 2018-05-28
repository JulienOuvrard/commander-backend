import { Schema, Document, SchemaTypes, Model, model } from 'mongoose';
import { Meal } from './meal';
import { Round } from './round';

export interface CommandInterface {
  rounds: string[];
  meals: string[];
  name: string;
  price: number;
  isPaid: boolean;
  created: Date;
  updated: Date;
}

export interface CommandModelInterface extends CommandInterface, Document {
  description(cb: Function): void;
}

export var CommandSchema: Schema = new Schema({
  rounds: [SchemaTypes.ObjectId],
  meals: [SchemaTypes.ObjectId],
  name: { type: String },
  price: { type: Number, required: true, default: 0 },
  isPaid: { type: Boolean, required: true, default: false },
  created: { type: Date },
  updated: { type: Date }
}, {
    autoIndex: true,
    collection: 'commands'
  }).pre("save", function (next) {
    let document = <CommandModelInterface>this
    let now = new Date();
    if (!document.created) {
      document.created = now;
    }
    document.updated = now;
    next();
  }).pre('update', function (next) {
    next();
  });

CommandSchema.methods.description = function (cb: Function) {
  // TODO Add description
  
}

export const Command: Model<CommandModelInterface> = model<CommandModelInterface>('Command', CommandSchema);
