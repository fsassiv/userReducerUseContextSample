const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 3000;

//MIDDLEWARES
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("tiny"));
app.use(bodyParser.json());

//route for request
app.get("/api", async (req, res) => {
  res.send("Here!");
});

//deploy the build version for production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
