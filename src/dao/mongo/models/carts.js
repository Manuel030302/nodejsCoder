import mongoose from 'mongoose';

const collection = "carts";

const schema = new mongoose.Schema({
    items:{
        type:Array,
        default:[]
    }
    
},{timestamps:true})

const cartModel = mongoose.model(collection,schema);

export default cartModel;