const express = require("express");
const port = 3000;

const app = express();
const bodyParser = require("body-parser");

//
require("./db");
require("./models/User");



const authRoutes = require("./routes/authRoutes");
const requireToken = require("./Middlewares/AuthTokenRequired");
const userRoutes = require("./routes/userRoutes");


// 

app.use(bodyParser.json());
app.use(authRoutes);
app.use(userRoutes);
app.use('/uploads', express.static('uploads'));




//

app.get("/", requireToken, (req, res) => {
  // res.send(`Your email: ${req.user.email}`);
  console.log(req.user);
  res.send(req.user);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});