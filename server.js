const express = require('express');
const bodyParser = require('body-parser');
const getCSV = require('get-csv');

// create express app
const app = express();
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

//middleware to fetch Csv file and proceed only if it is fetched successfully
app.use('/',function(req, res, next) {
	getCSV('https://www.newslaundry.com/sample-data/sample-subscribers.csv')
		.then(rows => {
			req.subscriptionData = rows;
			next();
		})
		.catch(err => {
			res.status(500).send({message:"Error in loading file"});
		});
});
require('./app/routes/app.routes.js')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
