// dependencies
const express = require("express");

// express server
const app = express();

// setting PORT for listener
const PORT = process.env.PORT || 3001;

// middleware to parse data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// API routes

// listener 
app.listen(PORT, function () {
    console.log(`The App is listening on PORT: ${PORT}`);
});