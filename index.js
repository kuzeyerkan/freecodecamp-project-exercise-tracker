const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./connect/connect");
require("dotenv").config();
const routers = require("./routers/routers");
const bodyParser = require("body-parser");
const port = 3000;
//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

//routes

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/api/users", routers);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listenin on port ${port}`));
  } catch (error) {
    console.error(error);
  }
};

start();
