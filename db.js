const mongoose = require("mongoose");
require("dotenv").config();

mongoose
    .connect(process.env.mongo_URL)
    .then(() => {
        console.log("Database connect successfully !!");
    })
    .catch((err) => {
        console.log("Could not to connect to db " + err);
    });
