const express = require("express");
const notes = require("./data/notes");
//const cors = require("cors");
const app = express();
const connectDB = require("./config/db");
const dotenv = require("dotenv");
dotenv.config();
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");

const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const PORT = process.env.PORT || 5000;
//app.use(cors());
app.listen(PORT, console.log(`server started on port ${5000}`));
connectDB();
app.use(express.json());
// app.use(notFound);
// app.use(errorHandler);
app.get("/", (req, res) => {
  res.send("api is runnning...");
});

// app.get("/api/notes", (req, res) => {
//   res.json(notes);
// });

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);
