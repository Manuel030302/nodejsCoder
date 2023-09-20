import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const collection = "products";

const schema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    thumbnail: {
        type:Array,
        default:[]
    },
    code:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true
    }
    
},{timestamps:true})

schema.plugin(mongoosePaginate);

const productModel = mongoose.model(collection,schema);

/* 
const Product = mongoose.model('Product', schema);

async function insertProducts() {
  const products = [
    { title: 'Producto 1', description: 'Descripción del producto 1', price: 100, code: 'P001', stock: 10 },
    { title: 'Producto 2', description: 'Descripción del producto 2', price: 200, code: 'P002', stock: 20 },
    { title: 'Producto 3', description: 'Descripción del producto 3', price: 300, code: 'P003', stock: 30 },
    { title: 'Producto 4', description: 'Descripción del producto 4', price: 400, code: 'P004', stock: 40 },
    { title: 'Producto 5', description: 'Descripción del producto 5', price: 500, code: 'P005', stock: 50 },
    { title: 'Producto 6', description: 'Descripción del producto 6', price: 600, code: 'P006', stock: 60 },
    { title: 'Producto 7', description: 'Descripción del producto 7', price: 700, code: 'P007', stock: 70 },
    { title: 'Producto 8', description: 'Descripción del producto 8', price: 800, code: 'P008', stock: 80 },
    { title: 'Producto 9', description: 'Descripción del producto 9', price: 900, code: 'P009', stock: 90 },
    { title: 'Producto10', description:'Descripción del producto10', price :1000, code:'P010' ,stock :100}
  ];
  
  await Product.insertMany(products);
  }
  
  insertProducts(); */

export default productModel;