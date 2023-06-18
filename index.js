const mongoose = require("mongoose");
const { app, port } = require("./app");
const config = require("./config");
const path = require("path");
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =
  "mongodb+srv://admin:12345@sl.lacxvio.mongodb.net/?retryWrites=true&w=majority";

const run = async () => {
  await mongoose.connect(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
      useNewUrlParser: true,
    },
  });

  console.log("Connected to mongo DB");

  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
};

run().catch(console.log);
