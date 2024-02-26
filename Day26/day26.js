const { MongoClient } = require('mongodb');

async function getProductStatistics() {
    const uri = "mongodb://127.0.0.1";
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const database = client.db("newdatabase2");
        const collection = database.collection("products");
        const pipeline = [
            {
                $group: {
                    _id: null,
                    totalProducts: { $sum: 1 },
                    averagePrice: { $avg: "$price" },
                    highestQuantity: { $max: "$quantity" }
                }
            }
        ];
        const result = await collection.aggregate(pipeline).toArray();
        return result[0];
    } finally {
        await client.close();
    }
}

getProductStatistics().then(result => {
    console.log(result);
}).catch(error => {
    console.error("Error:", error);
});
