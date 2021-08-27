const db = require("../models");
const Tutorial = db.tutorials;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
	if (!req.body.title) {
		res.status(400).send({
		  message: "Content can not be empty!"
		});
		return;
	  }
	
	  // Create a Tutorial
	  const tutorial = {
		title: req.body.title,
		description: req.body.description,
		published: req.body.published ? req.body.published : false
	  };
	
	  // Save Tutorial in the database
	  Tutorial.create(tutorial)
		.then(data => {
		  res.send(data);
		})
		.catch(err => {
		  res.status(500).send({
			message:
			  err.message || "Some error occurred while creating the Tutorial."
		  });
		});
};


// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
	Tutorial.findAll()
	  .then(data => {
		console.log("data is:",data);
		// res.send(data);
		res.render('index', { title:"Get all data from databse", data});
	  })
	  .catch(err => {
		res.status(500).send({
		  message:
			err.message || "Some error occurred while retrieving tutorials."
		});
	  });
  };

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
	const id = req.params.id;
  
	Tutorial.findByPk(id)
	  .then(data => {
		// res.send(data);
		console.log("data is:",data);
		res.render('findbyId', { title:"Get Single data by id from databse", data});
	  })
	  .catch(err => {
		res.status(500).send({
		  message: "Error retrieving Tutorial with id=" + id
		});
	  });
  };


