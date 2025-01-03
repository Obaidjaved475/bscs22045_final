const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("config");
const path = require("path");

const tickets = require("./routes/api/tickets");
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");

const app = express();

app.use(express.json());
app.use(cors());

const db = config.get("mongodb+srv://obaid:obaid1234@finalproject.scvj6.mongodb.net/?retryWrites=true&w=majority&appName=finalproject");

// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.log(err));

// Use routes
app.use("/api/tickets", tickets);
app.use("/api/users", users);
app.use("/api/auth", auth);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
