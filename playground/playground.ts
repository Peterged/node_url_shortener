import estorage, { TBlueprintConvertType } from 'estorage';
import mongoose from 'mongoose';

const bp = new estorage.Blueprint({
  username: Number,
  password: String,
  age: Number,
  email: String,
  address: {
    street: String,
    city: String,
    state: String,
    zip: Number,
  },
});

const User = estorage.implement('User', bp);

export default User;

const BP = new mongoose.Schema({
  username: { type: String, required: true },
  password: String,
  age: Number,
  email: String,
  test: String,
  test1: String,
  test2: String,
  test3: String,
  address: {
    street: String,
    city: String,
    state: String,
    zip: Number,
  },
});

interface ExampleRecord extends Record<string, AllTypes> {
  name: string,
  age: number
}

type MappedType = TBlueprintConvertType<ExampleRecord>;
