const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const product = require('./model');

function connectmongdb(){
    mongoose.connect('mongodb://127.0.0.1/newdatabase2')
    .then(() => console.log("connected"))
    .catch(err => console.error("not connected", err));
}
connectmongdb();
app.use(express.json());

app.post("/products" ,async(req,res)=>{
    try {
        await product.createProduct(req.body);
        res.status(201).json({ message: "Product created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

app.get("/products" ,async(req,res)=>{
    try {
        const products = await product.getProductsPopulatedWithCategory();
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

app.post("/category" ,async(req,res)=>{
    try {
        await product.createcategory(req.body);
        res.status(201).json({ message: "Category created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

app.listen(port , ()=>{
    console.log(`http://localhost:${port}`);
})
