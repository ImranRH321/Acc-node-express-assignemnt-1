const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;

// var bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

const userRouter = require("./routes/user.route");

// middleware
app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Project is running ");
});

app.all("*", (req, res) => {
  res.status(404).json({ success: false, messages: "Not Found data" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
