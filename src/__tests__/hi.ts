import mongoose from 'mongoose'

const User = new mongoose.Schema({
    user: String
});

const UserModel = mongoose.model('UserModel', User);