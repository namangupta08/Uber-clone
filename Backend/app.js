const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connecttodb = require('./db/db')
const userRoute = require('./routes/userRoutes')
const captainRoute = require('./routes/captainRoutes')
const mapsRoute = require('./routes/mapsRoutes')
const cookieparser = require('cookie-parser')
const rideRoute = require('./routes/rideRoutes')

connecttodb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieparser())

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use('/users' , userRoute)
app.use('/captains' , captainRoute)
app.use('/maps' , mapsRoute)
app.use('/rides' , rideRoute)

module.exports = app;
