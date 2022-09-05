const express = require("express");
const cors =  require("cors");
const app = express();

// ----------------- SETTING
app.set("port", process.env.PORT || 3200);

// ----------------- MIDDLEWARE
app.use(cors());
app.use(express.json());
// ----------------- ROUTES
app.use('/api/users', require('./routes/users'));
app.use('/api/notes', require('./routes/notes'));


module.exports = app;
