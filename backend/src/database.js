const mongoose = require("mongoose");
// ------------- CONECT WITH MONGODB USE DOTENV
const { LOCAL_APP_HOST, THE_APP_DATABASE } = process.env;
const MONGODB = `mongodb://${LOCAL_APP_HOST}/${THE_APP_DATABASE}`;

mongoose
  .connect(MONGODB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,  
  })
  .then((db) => console.log("Database connected"))
  .catch((err) => console.log(err));
