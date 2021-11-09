import mongoose from 'mongoose';
const { Schema } = mongoose;
export const UsersSchema = Schema({
    
    email:{
        type: String,
        required: true,
        unique: true
    },
    bpToken: {
        type: String
    },
    pid: {
        type: String
    },
    getMails: {
        type: Boolean
    },
    created_at:{
        type: Date,
        default: Date.now
    },
    lastLogin:{
        type: String
    }
});

export const User =  mongoose.model('users', UsersSchema);