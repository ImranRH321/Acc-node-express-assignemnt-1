const express = require("express");
const app = express();
const cors = require("cors");
const PORT =  process.env.PORT || 5000;

const userRouter = require("./routes/user.route");
const dbConnect = require("./utils/dbConnect");

app.use(express.json());
app.use(cors());

dbConnect();
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Assignment is running ");
});

app.all("*", (req, res) => {
  res.status(404).json({ success: false, messages: "Not Found data" });
});

app.listen(PORT, () => {
  console.log(`server is running http://localhost:${PORT}`);
});
