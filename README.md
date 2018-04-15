# NewsLaundry
Assignment of News laundry


This Assignment is completed in Node with the Express framework.

Setup:
1) Install Node
2) Pull of the repository in any local folder.
3) Run "node server.js" which will start server at localhost:3000

Folder structre:

1) server.js  // Application has to be started with this file
2) package.json 
2) node_modules // node modules folder created by "npm install"
3) app -> controllers -> app.controller.js  // Controller file to handle routes
4) app -> routes -> app.routes.js  // Routes 


For two problem statement two routes have been defined in app.routes.js

1) /subscribers/:month   // Problem statement 1 (GET api with month parameter)
2) /levels/:month  // Problem statement 2 (GET api with month parameter)

Note: month paramater should be full name of the month.

Middleware is defined in server.js file which fetches the Csv from the Url.If successfullt fetched proceed further
else returns

In Problem statement 1 ,to find number of gainers and losers for the given month,
I calculated the count of start date and end date for the particular month from Csv file.

Url example : http://localhost:3000/subscribers/January 

In Problem statement 2,to find division of subscription levels for particular month,
I calculated the Month that lie from start date to end date and calculated the individual count of the levels.

Url example: http://localhost:3000/levels/January
