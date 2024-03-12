const express = require("express");
const cors = require("cors")
const app = express();
const database = require("./db");
const port = 5000;
database();
app.use(express.json());
app.use(cors());
app.use("/api", require("./Routes/Createuser"));
app.use("/api",require("./Routes/Displaydata"))
app.listen(port, () => {
  console.log("The backend is live on port 5000");
});
