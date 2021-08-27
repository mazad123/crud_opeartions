const express = require("express");
const cors = require("cors");
const app = express();
const path = require('path');
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//view engine
app.set('views', './app/views');
// app.set('view-engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const db = require("./app/models");

db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  // res.json({ message: "Welcome to Nodejs and ExpreeJs application." });
  res.render('index');
});

require('./app/routes/tutorial.routes')(app); 

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
