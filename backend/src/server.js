require('dotenv').config();
const app  = require('./app.js')
require('./database');

// ------ DEFINE PORT
const port = app.get('port')
app.listen(port, () => {
    console.log(`Server on port: ${port}`);
})
