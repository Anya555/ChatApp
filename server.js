require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
// const routes = require("./routes");
const PORT = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "./client/dist/client")));
}
// app.use(routes);

app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
