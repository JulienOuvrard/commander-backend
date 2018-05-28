import { Schema, Document, SchemaTypes, Model, model } from 'mongoose';
import { Meal } from './meal';
import { Round } from './round';

function flatten(arr) {
  return Array.prototype.concat(...arr);
}

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
  description(): any;
}

export var CommandSchema: Schema = new Schema({
  rounds: [{type: SchemaTypes.ObjectId, ref: 'Round'}],
  meals: [{type:SchemaTypes.ObjectId, ref: 'Meal'}],
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

CommandSchema.methods.description = function () {
  // TODO Add description
  const desc: any[] = []
  desc.push(this.rounds.map(round => {
    return {
      id: round.id,
      type: 'round',
      paid: round.isPaid,
      detail: round.drinks.map(drink=>{
              return `(${drink.quantity}) ${drink.name}`
            }).join(' '), 
      price: round.price
    };
  }))
  desc.push(this.meals.map(meal => {
    return {
      id: meal.id,
      type: 'meal',
      paid: meal.isPaid,
      detail: meal.foods.map(food=>{
              return `(${food.quantity}) ${food.name}`
            }).join(' '), 
      price: meal.price
    };
  }))
  return flatten(desc);
}

export const Command: Model<CommandModelInterface> = model<CommandModelInterface>('Command', CommandSchema);
