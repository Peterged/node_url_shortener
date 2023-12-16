import elstorage from 'elstorage';

import mongoose from 'mongoose';

const UserBlueprint = new elstorage.Blueprint({
  username: { type: String },
});

const UserImplementation = elstorage.implement('User', User);

const UserSchema = new mongoose.Schema();

