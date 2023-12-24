const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const nodemailer = require('nodemailer')
const port = process.env.PORT || 5000;
const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);


// middleware
app.use(cors());
app.use(express.json());

const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({ error: true, message: 'unauthorized access' })
  }

  // bearer token
  const token = authorization.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: true, message: 'unauthorized access' })
    }
    req.decoded = decoded;
    next();
  })
}

// Send Email
const sendMail = (emailData, emailAddress) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  })

  // verify connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error)
    } else {
      console.log('Server is ready to take our messages')
    }
  })

  const mailOptions = {
    from: process.env.EMAIL,
    to: emailAddress,
    subject: emailData?.subject,
    html: `<p>${emailData?.message}</p>`,
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
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
    const usersCollection = client.db("bookingManagementDB").collection("users");
    const roomsCollection = client.db("bookingManagementDB").collection("rooms");
    const carsCollection = client.db("bookingManagementDB").collection("cars");
    const blogsCollection = client.db("bookingManagementDB").collection("blogs");
    const reviewsCollection = client.db("bookingManagementDB").collection("reviews");
    const wishListCollection = client.db('bookingManagementDB').collection('wishList');
    const bookingsCollection = client.db("bookingManagementDB").collection("bookings");


    // Generate client secret

    app.post('/create-payment-intent', verifyJWT, async (req, res) => {
      const { price } = req.body
      if (price) {
        const amount = parseFloat(price) * 100
        const paymentIntent = await stripe.paymentIntents.create({
          amount: amount,
          currency: 'usd',
          payment_method_types: ['card']

        })
        res.send({
          clientSecret: paymentIntent.client_secret,
        });
      }

    })


    app.post('/jwt', (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
      res.send({ token })
    })

    // Admin middle ware
    // Warning: use verifyJWT before verifyAdmin

    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      if (user?.role !== 'admin') {
        return res.status(403).send({ error: true, message: 'Forbidden message' })
      }
      next();

    }


    // users related apis

    app.get('/users', async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    })

    //  user data  save api 

    app.post('/users', async (req, res) => {
      const user = req.body;
      user.role = 'guest';
      const query = { email: user.email }
      const existingUser = await usersCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: 'User already exist' })
      }
      const result = await usersCollection.insertOne(user);
      res.send(result)
    })
    //  Admin data  save api 

    app.post('/infoAdmin', async (req, res) => {
      const user = req.body;
      user.role = 'admin';
      const query = { email: user.email }
      const existingUser = await usersCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: 'User already exist' })
      }
      const result = await usersCollection.insertOne(user);
      res.send(result)
    })
    //  Host data  save api 

    app.post('/infoHost', async (req, res) => {
      const user = req.body;
      user.role = 'host';
      const query = { email: user.email }
      const existingUser = await usersCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: 'User already exist' })
      }
      const result = await usersCollection.insertOne(user);
      res.send(result)
    })

    // user information update api 

    app.put('/users/:email', async (req, res) => {
      const email = req.params.email;
      const updatedUserData = req.body;
      const filter = { email: email }
      const updateDoc = {
        $set: updatedUserData,
      }
      const result = await usersCollection.updateOne(filter, updateDoc)
      res.send(result)
    })

    //useAdmin hook api

    app.get('/users/admin/:email', verifyJWT, async (req, res) => {
      const email = req.params.email;
      if (req.decoded.email !== email) {
        res.send({ admin: false })
      }
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      const result = { Admin: user?.role === 'admin' }
      res.send(result);
    })

    //useHost hook api

    app.get('/users/host/:email', verifyJWT, async (req, res) => {
      const email = req.params.email;
      if (req.decoded.email !== email) {
        res.send({ host: false })
      }
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      const result = { Host: user?.role === 'host' }
      res.send(result);
    })

    //useGuest hook api

    app.get('/users/guest/:email', verifyJWT, async (req, res) => {
      const email = req.params.email;
      if (req.decoded.email !== email) {
        res.send({ guest: false })
      }
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      const result = { Guest: user?.role === 'guest' }
      res.send(result);
    })


    //make host api

    app.patch('/users/host/:id', async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const filter = { _id: new ObjectId(id) };
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


    // Search API

    app.get("/search/:text", async (req, res) => {
      const text = req.params.text;

      const roomResults = await roomsCollection
        .find({
          $and: [
            { title: { $regex: text, $options: "i" } },

          ],
        })
        .toArray();

      const carResults = await carsCollection
        .find({
          $and: [
            { title: { $regex: text, $options: "i" } },

          ],
        })
        .toArray();

      res.send({
        rooms: roomResults,
        cars: carResults,
      });
    });


    // Room Related APIS

    // save a room in data base

    app.post('/rooms', async (req, res) => {
      const rooms = req.body;
      const result = await roomsCollection.insertOne(rooms)
      res.send(result);
    })
    // get all rooms

    app.get('/rooms', async (req, res) => {
      const result = await roomsCollection.find().toArray()
      res.send(result)
    })


    // delete room
    app.delete('/rooms/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await roomsCollection.deleteOne(query)
      res.send(result)
    })

    // Update A room
    app.put('/rooms/:id', verifyJWT, async (req, res) => {
      const room = req.body
      console.log(room)

      const filter = { _id: new ObjectId(req.params.id) }
      const options = { upsert: true }
      const updateDoc = {
        $set: room,
      }
      const result = await roomsCollection.updateOne(filter, updateDoc, options)
      res.send(result)
    })


    // Get  room by host email
    app.get('/rooms/:email', async (req, res) => {
      const email = req.params.email
      const query = { 'host.email': email }
      const result = await roomsCollection.find(query).toArray()
      res.send(result)
    })

    // get featured rooms

    app.get('/featured', async (req, res) => {
      const query = {
        type: 'Featured',
        status: 'approved'
      };
      const result = await roomsCollection.find(query).toArray();
      res.send(result);

    });


    // Get a single room

    app.get('/room/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await roomsCollection.findOne(query)
      res.send(result)
    })


    // approve rooms get api 
    app.get("/approvedRoom", async (req, res) => {
      const approve = req.body;
      const query = {
        status: 'approved'
      }
      const result = await roomsCollection.find(query).toArray();
      res.send(result);
    });

    //Room status change  api

    app.patch('/rooms/approved/:id', async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          status: 'approved'
        },
      };
      const result = await roomsCollection.updateOne(filter, updateDoc);
      res.send(result);

    })

    app.patch('/rooms/denied/:id', async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          status: 'denied'
        },
      };
      const result = await roomsCollection.updateOne(filter, updateDoc);
      res.send(result);
    })


    // search rooms

    app.get("/roomSearch", async (req, res) => {
      const query = req.query;
      const checkIn = new Date(query.checkIn);
      const checkOut = new Date(query.checkOut);

      if (
        query.location &&
        checkIn instanceof Date && !isNaN(checkIn) &&
        checkOut instanceof Date && !isNaN(checkOut)
      ) {
        const allRooms = await roomsCollection.find().toArray();

        const filteredRooms = allRooms.filter((room) => {
          const validLocation = room.location === query.location;
          const validCheckIn = new Date(room.from) <= checkIn;
          const validCheckOut = new Date(room.to) >= checkOut;

          return validLocation && validCheckIn && validCheckOut;
        });

        res.send(filteredRooms);
      } else {
        res.status(400).send("Invalid search parameters");
      }
    });
    // search cars

    app.get("/carSearch", async (req, res) => {
      const query = req.query;
      const checkIn = new Date(query.checkIn);
      const checkOut = new Date(query.checkOut);

      if (
        query.location &&
        checkIn instanceof Date && !isNaN(checkIn) &&
        checkOut instanceof Date && !isNaN(checkOut)
      ) {
        const allCars = await carsCollection.find().toArray();

        const filteredCars = allCars.filter((car) => {
          const validLocation = car.location === query.location;
          const validCheckIn = new Date(car.from) <= checkIn;
          const validCheckOut = new Date(car.to) >= checkOut;

          return validLocation && validCheckIn && validCheckOut;
        });

        res.send(filteredCars);
      } else {
        res.status(400).send("Invalid search parameters");
      }
    });

    //Car status change  api

    app.patch('/cars/approved/:id', async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          status: 'approved'
        },
      };
      const result = await carsCollection.updateOne(filter, updateDoc);
      res.send(result);

    })

    app.patch('/cars/denied/:id', async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          status: 'denied'
        },
      };
      const result = await carsCollection.updateOne(filter, updateDoc);
      res.send(result);
    })



    // delete car
    app.delete('/cars/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await carsCollection.deleteOne(query)
      res.send(result)
    })

    // Update A car
    app.put('/cars/:id', verifyJWT, async (req, res) => {
      const car = req.body
      console.log(car)

      const filter = { _id: new ObjectId(req.params.id) }
      const options = { upsert: true }
      const updateDoc = {
        $set: car,
      }
      const result = await carsCollection.updateOne(filter, updateDoc, options)
      res.send(result)
    })


    // Get  room by host email
    app.get('/cars/:email', async (req, res) => {
      const email = req.params.email
      const query = { 'host.email': email }
      const result = await carsCollection.find(query).toArray()
      res.send(result)
    })

    //  Wish List API

    app.get('/wishList', async (req, res) => {
      const email = req.query.email

      if (!email) {
        res.send([])
      }
      const query = { email: email }
      const result = await wishListCollection.find(query).toArray()
      res.send(result)
    })

    app.delete('/wishList/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await wishListCollection.deleteOne(query);
      res.send(result);
    })

    app.post('/wishList', async (req, res) => {
      const wishList = req.body;
      const result = await wishListCollection.insertOne(wishList);
      res.send(result);
    })


    
    // Car Related APIS

    // save a car in data base

    app.post('/cars', async (req, res) => {
      const cars = req.body;
      const result = await carsCollection.insertOne(cars)
      res.send(result);
    })
    // get all cars

    app.get('/cars', async (req, res) => {
      const result = await carsCollection.find().toArray()
      res.send(result)
    })
    // approve car get api 
    app.get("/approvedCar", async (req, res) => {
      const approve = req.body;
      const query = {
        status: 'approved'
      }
      const result = await carsCollection.find(query).toArray();
      res.send(result);
    });

    // get featured cars

    app.get('/featuredCar', async (req, res) => {
      const query = {
        type: 'Featured',
        status: 'approved'
      };
      const result = await carsCollection.find(query).toArray();
      res.send(result);

    });
    // Get a single car

    app.get('/car/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await carsCollection.findOne(query)
      res.send(result)
    })

    // update room booking status
    app.patch('/rooms/status/:id', async (req, res) => {
      const id = req.params.id
      const status = req.body?.status
      const query = { _id: new ObjectId(id) }
      const updateDoc = {
        $set: {
          booked: status,
        },
      }
      const update = await roomsCollection.updateOne(query, updateDoc)
      res.send(update)
    })
    // update car booking status
    app.patch('/cars/status/:id', async (req, res) => {
      const id = req.params.id
      const status = req.body?.status
      const query = { _id: new ObjectId(id) }
      const updateDoc = {
        $set: {
          booked: status,
        },
      }
      const update = await carsCollection.updateOne(query, updateDoc)
      res.send(update)
    })

    // Get bookings for guest
    app.get('/bookings', async (req, res) => {
      const email = req.query.email

      if (!email) {
        res.send([])
      }
      const query = { 'guest.email': email }
      const result = await bookingsCollection.find(query).toArray()
      res.send(result)
    })

    // Save a booking in database
    app.post('/bookings', async (req, res) => {
      const booking = req.body
      const result = await bookingsCollection.insertOne(booking)
      if (result.insertedId) {
        // Send confirmation email to guest
        sendMail(
          {
            subject: 'Booking Successful!',
            message: `Booking Id: ${result?.insertedId}, TransactionId: ${booking.transactionId}`,
          },
          booking?.guest?.email
        )
        // Send confirmation email to host
        sendMail(
          {
            subject: 'Your room got booked!',
            message: `Booking Id: ${result?.insertedId}, TransactionId: ${booking.transactionId}. Check dashboard for more info`,
          },
          booking?.host
        )
      }
      console.log(result)
      res.send(result)
    })


    // delete a booking

    app.delete('/bookings/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await bookingsCollection.deleteOne(query)
      res.send(result)
    })

    //blog related api
    // save blog in data base

    app.post('/blogs', async (req, res) => {
      const blogData = req.body;
      blogData.date = new Date();
      const result = await blogsCollection.insertOne(blogData);
      res.send(result);
    });
    // get all blogs

    app.get('/blogs', async (req, res) => {
      const result = await blogsCollection.find().toArray()
      res.send(result)
    })

    //  get featured blogs

    app.get('/featuredBlog', async (req, res) => {
      const query = {
        type: 'Featured'
      };
      const result = await blogsCollection.find(query).toArray();
      res.send(result);

    });

    // Get blog Details 

    app.get('/blog/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await blogsCollection.findOne(query)
      res.send(result)
    })

    // Get  blog by host email
    app.get('/blogs/:email', async (req, res) => {
      const email = req.params.email
      const query = { 'host.email': email }
      const result = await blogsCollection.find(query).toArray()
      res.send(result)
    })

    // delete blog
    app.delete('/blogs/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await blogsCollection.deleteOne(query)
      res.send(result)
    })

    // Update A blog
    app.put('/blogs/:id', verifyJWT, async (req, res) => {
      const blog = req.body
      console.log(blog)

      const filter = { _id: new ObjectId(req.params.id) }
      const options = { upsert: true }
      const updateDoc = {
        $set: blog,
      }
      const result = await blogsCollection.updateOne(filter, updateDoc, options)
      res.send(result)
    })

    //Car status change  api

    app.patch('/blogs/approved/:id', async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          status: 'approved'
        },
      };
      const result = await blogsCollection.updateOne(filter, updateDoc);
      res.send(result);

    })

    app.patch('/blogs/denied/:id', async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          status: 'denied'
        },
      };
      const result = await blogsCollection.updateOne(filter, updateDoc);
      res.send(result);
    })
    // review related api

    // rating and comment for blogs

    app.put('/reviewBlog/:postId', async (req, res) => {
      const postId = req.params.postId;
      const review = req.body
      const filter = { _id: new ObjectId(req.params.postId) }
      const options = { upsert: true }
      
      const updateDoc = {
        $push: { reviews: review }, 
      };
      const result = await blogsCollection.updateOne(filter, updateDoc, options)
      res.send(result)
    })
 
    // delete a blog review
    app.delete('/blog/:postId/reviews/:reviewIndex', async (req, res) => {
      const postId = req.params.postId;
      const reviewIndex = parseInt(req.params.reviewIndex, 10);
    
      if (!ObjectId.isValid(postId) || isNaN(reviewIndex) || reviewIndex < 0) {
        return res.status(400).json({ error: 'Invalid postId or reviewIndex' });
      }
    
      try {
        // Assuming you have a method to fetch the blogData from the database
        const blogData = await getBlogDataById(postId);
    
        if (!blogData) {
          return res.status(404).json({ error: 'Blog not found' });
        }
    
        const reviews = blogData.reviews || [];
    
        const result = await blogsCollection.updateOne(
          { _id: new ObjectId(postId) },
          {
            $pull: { reviews: { $exists: true, $in: [reviews[reviewIndex]] } },
          }
        );
    
        if (result.modifiedCount === 1) {
          res.status(200).json({ message: 'Review deleted successfully' });
        } else {
          res.status(404).json({ error: 'Review not found at the specified index' });
        }
      } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    async function getBlogDataById(postId) {
      try {
        const blogData = await blogsCollection.findOne({ _id: new ObjectId(postId) });
        return blogData;
      } catch (error) {
        console.error('Error fetching blog data by postId:', error);
        throw error; 
      }
    }
    // Admin Dashboard API

    app.get('/admin-status', async (req, res) => {
      const users = await usersCollection.estimatedDocumentCount();
      const rooms = await roomsCollection.estimatedDocumentCount();
      const cars = await carsCollection.estimatedDocumentCount();
      const blogs = await blogsCollection.estimatedDocumentCount();
      const orders = await bookingsCollection.estimatedDocumentCount();

      // best way to get sum of a field is to use group and sum operation

      const payments = await bookingsCollection.find().toArray();
      const TotalRevenue = payments.reduce((sum, payment) => sum + payment?.price, 0);
      const revenue = TotalRevenue.toFixed(2);

      res.send({
        users,
        rooms,
        cars,
        blogs,
        orders,
        revenue
      })
    })
    app.get('/order-stats', async (req, res) => {
      try {
        const pipeline = [
          {
            $group: {
              _id: '$title',
              count: { $sum: 1 },
              total: { $sum: '$price' }, 
            },
          },
          {
            $project: {
              category: '$_id',
              count: 1,
              total: { $round: ['$total', 2] },
              _id: 0,
            },
          },
        ];

        const result = await bookingsCollection.aggregate(pipeline).toArray();
        res.send(result);
      } catch (error) {
        console.error('Error in /order-stats:', error);
        res.status(500).send('Internal Server Error');
      }
    });

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('bookingManagementDB is running')
})

app.listen(port, () => {
  console.log(`bookingManagementDB is running on port: ${port}`);
})