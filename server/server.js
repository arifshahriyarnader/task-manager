require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");

//parse requests
app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

//db
connectDB();

//routes
//users route
app.use("/api/users", require("./routes/api/user"));

//task route
app.use("/api/task", require("./routes/api/task"));

//ai route
app.use("/api/ai", require("./routes/api/ai"));

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
