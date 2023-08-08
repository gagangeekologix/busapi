const express = require('express');
const app = express();
const port = 3001;
const dotenv = require("dotenv").config();
const cors = require('cors');
const mongoose = require('mongoose');
const BusStop = require('./models/busStop');
const Bus = require('./models/bus');
const connectDb = require('./Db/dbConnection');
connectDb();
app.use(express.json());
app.use(cors());

app.use("/api", require("./routes/busRoutes"));
app.use("/api", require("./routes/busStopRoutes"));




app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
