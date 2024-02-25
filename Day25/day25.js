const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number
});
const Product = mongoose.model('Product', productSchema);

function createProductNameIndex() {
  Product.collection.createIndex({ name: 1 }, (err, result) => {
    if (err) {
      console.error('Error creating index:', err);
    } else {
      console.log('Index created successfully:', result);
    }
  });
}

function mongdbconnect(){
    mongoose.connect("mongodb://127.0.0.1/newProduct25")
    .then(()=> console.log('Connected to Mongodb'))
    .catch(err => console.error("Error: ",err));
    createProductNameIndex();
}

mongdbconnect();
