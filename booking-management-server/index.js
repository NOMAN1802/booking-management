const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;


// middleWare 
app.use(cors());
app.use(express.json());

const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  if(!authorization){
    return res.status(401).send({error: true, message: 'unauthorized access' })
  }

  // bearer token
  const token = authorization.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) =>{
    if(err){
      return res.status(401).send({error: true, message: 'unauthorized access' })
    }
    req.decoded = decoded;
    next();
  })
}

// const uri = 'mongodb://0.0.0.0:27017' 

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bduz0qc.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const usersCollection = client.db("bookingDB").collection("users");
   
    app.post('/jwt' ,(req, res) =>{
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '1h' })
      res.send({token})
    })

    // Admin middle ware
    // Warning: use verifyJWT before verifyAdmin

    const verifyAdmin = async(req, res, next) => {
       const email = req.decoded.email;
      const query = {email: email};
      const user = await usersCollection.findOne(query);
      if(user?.role !== 'admin'){
        return res.status(403).send({error: true, message: 'Forbidden message'} )
      }
      next();

    }

    // users related apis

    app.get('/users',async (req,res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    })

    // app.get('/users/:email', async (req, res) => {
    //     const email = req.params.email
    //     const query = { email: email }
    //     const result = await usersCollection.findOne(query)
    //     res.send(result)
    //   })

    app.post('/users', async (req,res) =>{
      const user = req.body;
      user.role = 'client';
      const query = {email: user.email}
      const existingUser = await usersCollection.findOne(query);
      if(existingUser){
        return res.send({message: 'User already exist'})
      }
      const result = await usersCollection.insertOne(user);
      res.send(result)
    })

    app.put('/users/:email', async (req, res) => {
      const email = req.params.email;
      const updatedUserData = req.body;
      const filter = { email :email}
      const updateDoc = {
        $set: updatedUserData,
      }
      const result = await usersCollection.updateOne(filter, updateDoc)
      res.send(result)
    })
   
    app.patch('/users/admin/:id', async (req,res) => {
      const id = req.params.id;
      console.log(id);
      const filter = {_id: new ObjectId(id)};
      const updateDoc = {
        $set: {
          role: "admin"
        },
      };
      const result = await usersCollection.updateOne(filter, updateDoc);
      res.send(result);
    })
      app.get('/users/admin/:email', verifyJWT, async (req, res) =>{
        const email = req.params.email;
      
        if(req.decoded.email !== email){
          res.send({ admin: false})
        }

        const query = {email: email};
        const user = await usersCollection.findOne(query);
        const result = {admin: user?.role === 'admin'}
        res.send(result);
      })

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res)=>{
    res.send('bookig is running')
})

app.listen(port, ()=>{
    console.log(`Booking  is sitting on port: ${port}`);
})