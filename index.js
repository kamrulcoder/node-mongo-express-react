const express = require("express");
const {MongoClient} = require('mongodb');
const cors = require("cors");
const ObjectId = require('mongodb').ObjectId;

const app = express();

// middleware
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://hasan:1dETwoULbhVVtNgT@kamrul.lek86.mongodb.net/myFirstDatabase?re" +
        "tryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

async function run() {
    try {
        await client.connect();
        const database = client.db('ecommerce');
        const userCollection = database.collection('users');
        // Query for a movie that has the title 'Back to the Future'
        
        app.get("/users", async (req,res) => {
            const cursor = userCollection.find({})
            const users = await cursor.toArray();
            res.send(users)
        })

        
        app.get("/users/:id", async(req,res) => {
            const id = req.params.id;
            const query = {_id :ObjectId(id)}
            const result = await userCollection.findOne(query)
            res.json(result)

        })
        

        app.delete("/users/:id", async(req,res) => {
            const id = req.params.id;
            const query = {_id :ObjectId(id)}
            const result = await userCollection.deleteOne(query)
            console.log("you are successfully delete ");
            res.json(result)

        })

        app.post("/users",async (req,res) => {
            const newUser = req.body;
            const result = await userCollection.insertOne(newUser);
            console.log("got new user ", newUser);
            console.log("added new User  ", result.insertedId);
            res.json(result);
            console.log("you are success fully post route hitted ");
        })



    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("you are successfully ")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`you are successfully and port is ${PORT}`);
})