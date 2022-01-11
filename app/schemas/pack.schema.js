import mongoose from 'mongoose';
const { Schema } = mongoose;
export const PacksSchema = Schema({

    imgSrc: {
        type: String
    },
    description: [{
        type: String
    }],
    content: [{
        type: String
    }],
    price: {
        type: Number
    },
    stock: {
        type: Number
    },
    soldOut: {
        type: Boolean,
        default: false
    },
    sale: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

export const Pack = mongoose.model('packs', PacksSchema);