//instatiate express module
const express = require("express");

//instatiate cors module
var cors = require("cors");

//use express in app variable
const app = express();

require("dotenv").config();

//import route module
const router = require("./src/routes");

const routerV2 = require("./src/routes/routeV2");

//define the server port
const port = 5000;

//use bodyparser, sehingga kita bisa mengirim request json dari client
app.use(express.json());

//use cors
app.use(cors());

//akses upload directory
app.use("/uploads", express.static("uploads"));

app.use("/api/v1", router);
app.use("/api/v2", routerV2);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//when this node.js app executed, it will listen to defined port
app.listen(port, () => console.log(`Listening on port ${port} !!!`));
