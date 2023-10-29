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
    const roomsCollection = client.db("bookingDB").collection("rooms");
    const carsCollection = client.db("bookingDB").collection("cars");
   
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
  
  //  user data  save api 

    app.post('/users', async (req,res) =>{
      const user = req.body;
      user.role = 'guest';
      const query = {email: user.email}
      const existingUser = await usersCollection.findOne(query);
      if(existingUser){
        return res.send({message: 'User already exist'})
      }
      const result = await usersCollection.insertOne(user);
      res.send(result)
    })

    // user information update api 

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
   
     //useAdmin hook api

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

     //useHost hook api

      app.get('/users/host/:email', verifyJWT, async (req, res) =>{
        const email = req.params.email; 
        if(req.decoded.email !== email){
          res.send({ host: false})
        }
        const query = {email: email};
        const user = await usersCollection.findOne(query);
        const result = {host: user?.role === 'host'}
        res.send(result);
      })

     //useGuest hook api

      app.get('/users/guest/:email', verifyJWT, async (req, res) =>{
        const email = req.params.email; 
        if(req.decoded.email !== email){
          res.send({ guest: false})
        }
        const query = {email: email};
        const user = await usersCollection.findOne(query);
        const result = {guest: user?.role === 'guest'}
        res.send(result);
      })


      //make host api

      app.patch('/users/host/:id', async (req,res) => {
        const id = req.params.id;
        console.log(id);
        const filter = {_id: new ObjectId(id)};
        const updateDoc = {
          $set: {
            role: "host"
          },
        };
        const result = await usersCollection.updateOne(filter, updateDoc);
        res.send(result);
      })


      // make admin api

      app.patch('/users/admin/:id', async (req, res) => {
        const id = req.params.id;
        console.log(id);
        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: {
            role: 'admin'
          },
        };
        const result = await usersCollection.updateOne(filter, updateDoc);
        res.send(result);
      })


      // Gust request for Host role 

    app.patch('/users/hostRequest/:email', async (req, res) => {
      const email = req.params.email;
      
      const query = {email: email};
      
      const updateDoc = {
        $set: {
          role: 'Make me Host'
        },
      };
      const result = await usersCollection.updateOne(query, updateDoc);
      res.send(result);
    })

  
      // Room Related APIS

      // save a room in data base

    app.post('/rooms', async (req, res) =>{
      const rooms = req.body;
      const result = await roomsCollection.insertOne(rooms)
      res.send(result);
    })
    // get all rooms
    
    app.get('/rooms', async (req,res) =>{
      const result = await roomsCollection.find().toArray()
      res.send(result)
    })

    // Get a single room

    app.get('/room/:id', async (req, res) =>{
      const id = req.params.id
      const query = {_id: new ObjectId(id)}
      const result = await roomsCollection.findOne(query)
      res.send(result)
    })


    // Car Related APIS

   // save a car in data base
   
    app.post('/cars', async (req, res) =>{
      const cars = req.body;
      const result = await carsCollection.insertOne(cars)
      res.send(result);
    })
    // get all cars
    
    app.get('/cars', async (req,res) =>{
      const result = await carsCollection.find().toArray()
      res.send(result)
    })

    // Get a single car

    app.get('/car/:id', async (req, res) =>{
      const id = req.params.id
      const query = {_id: new ObjectId(id)}
      const result = await carsCollection.findOne(query)
      res.send(result)
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