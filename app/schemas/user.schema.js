import mongoose from 'mongoose';
const { Schema } = mongoose;
export const UsersSchema = Schema({
    userName:{
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    verifyCode:{
        type: Number
    },
    name: {
        type: String
    },
    lastName:{
        type: String
    },
    role: {
        type: String
    },
    created_at:{
        type: Date,
        default: Date.now
    }
});

export const User =  mongoose.model('users', UsersSchema);