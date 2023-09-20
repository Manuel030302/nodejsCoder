import mongoose from 'mongoose';

const collection = "carts";

const cartsSubSchema = new mongoose.Schema({
    item: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'products'
    },
    units: {
        type: Number,
        default: 1
    },
}, {_id:false});

const schema = new mongoose.Schema({
    items:[cartsSubSchema],
    
},{timestamps:true})

const cartModel = mongoose.model(collection,schema);

export default cartModel;