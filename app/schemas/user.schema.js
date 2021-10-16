import mongoose from 'mongoose';
const { Schema } = mongoose;
export const UsersSchema = Schema({
    
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
    bpToken: {
        type: String
    },
    pid: {
        type: String
    },
    created_at:{
        type: Date,
        default: Date.now
    },
    getEmails: {
        type: Boolean,
        default: false
    }
});

export const User =  mongoose.model('users', UsersSchema);