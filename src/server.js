import express from "express";
import "./common/db/connection.js";

const app = express();
const PORT = 3000;

app.use(express.json()); // parse req body

// global error handler
app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).send(err.message);
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
