require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");

app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

connectDB();

app.use("/api/users", require("./routes/api/user"));

app.use("/api/task", require("./routes/api/task"));

app.use("/api/ai", require("./routes/api/ai"));

const port = 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
