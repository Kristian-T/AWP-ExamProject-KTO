/**** Node.js libraries *****/
const path = require('path');

/**** External libraries ****/
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

/**** Configuration ****/
const app = express();
//const MONGO_URL = process.env.MONGO_URL || 'mongodb+srv://<username>:<password>@cluster0.ywrdc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/DiscusDB';
mongoose.connect(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});

function createServer() {

  const routes = require("./routes")

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(morgan('combined'));
  app.use(cors());
  app.use(express.static(path.resolve('..', 'client', 'build')));

  /**** Add routes ****/
  app.use("/api/disclist", routes);

  // "Redirect" all non-API GET requests to React's entry point (index.html)
  app.get('*', (req, res) =>
    res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
  );

  return app;
}

module.exports = createServer;
