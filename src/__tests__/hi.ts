/* eslint-disable @typescript-eslint/ban-types */
// import elstorage from 'elstorage';

import mongoose from 'mongoose';

// const UserBlueprint = new elstorage.Blueprint({
//   username: { type: String,  },
// });

// const UserImplementation = elstorage.implement('User', User);

// const UserSchema = new mongoose.Schema({
//     username: Animation
// });

const User = new mongoose.Schema({
  username: String,
});

type AllTypes =
| String
| Number;

const createMessageBus = <T extends Record<string, AllTypes>, TExample = Example<T>>(opts: { events: T }) => {};

type Example<T extends Record<string, AllTypes>> = {
  [K in keyof T]: Prettify<{
    type: K
  }> & T[K]
}[keyof T];

type Prettify<T> = {
  [K in keyof T]: T[K]
} & {};

const chromeExtension = createMessageBus({
  events: {
    username: String,
    password: String,
  },
});
