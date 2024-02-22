const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const product = require('./model');

function connectmongdb(){
    mongoose.connect('mongodb://127.0.0.1/newdatabase')
    .then(() => console.log("connected"))
    .catch(err => console.error("not connected", err));
}
connectmongdb();
app.use(express.json());

app.post("/products" ,async(req,res)=>{
    try {
        await product.createProduct(req.body);
        res.status(201).send("Product created successfully");
    } catch (error) {
        res.status(500).send("Internal server error");
    }
})

app.get("/products" ,async(req,res)=>{
    try {
        const products = await product.getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).send("Internal server error");
    }
})

app.put("/products/:id" ,async(req,res)=>{
    try {
        await product.updateProduct(req.params.id ,req.body);
        res.send("Product updated successfully");
    } catch (error) {
        res.status(500).send("Internal server error");
    }
})

app.delete('/products/:id', async(req,res)=>{
    try {
        await product.deleteProduct(req.params.id,req.body);
        res.send("Deleted successfully");
    } catch (error) {
        res.status(500).send("Internal server error");
    }
})

app.listen(port , ()=>{
    console.log(`http"//localhost:${port}`);
})
