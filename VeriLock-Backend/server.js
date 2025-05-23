const express = require('express')
const app = express()
const port = 3001;
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
const cors =require('cors');
const dotEnv=require('dotenv')

dotEnv.config()
app.use(cors());
app.use(bodyParser.json());

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'VeriLockDB';
client.connect();

//to fetch
app.get('/passwords', async (req, res) => {
    const db = client.db(dbName)
    const collection = db.collection("passwords")
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

//to fetch by id
app.get('/passwords/:id', async (req, res) => {
    const id = req.params.id  //Not using yet
    const db = client.db(dbName)
    const collection = db.collection("passwords")
    const findResult = await collection.findOne({_id: new ObjectId(id)})
    res.json(findResult)
})

//to save
app.post('/passwords', async (req, res) => {
    const pass= req.body;
    const db = client.db(dbName)
    const collection = db.collection("passwords")
    await collection.insertOne(pass)

    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

//to update
app.put('/passwords/:id', async (req, res) => {
    const id= req.params.id;
    const {site,title,username,password,note}= req.body;
    const db = client.db(dbName)
    const collection = db.collection("passwords")
    await collection.findOneAndUpdate(
        {_id : new ObjectId(id)},
        { $set: {site,title,username,password,note} },
        { returnDocument: "after" }
    )
    const Updated = await collection.find({}).toArray();
    res.json(Updated)
})


//to delete
app.delete('/passwords/:id', async (req, res) => {
    const id= req.params;
    const db = client.db(dbName)
    const collection = db.collection("passwords")
    await collection.deleteOne({_id: new ObjectId(id)})
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}/passwords`)
})

