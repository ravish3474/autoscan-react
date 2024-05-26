// require("dotenv").config({ path: "./config/config.env" });
const express = require("express");
const path = require("path");
const app = require("./app");

const PORT = process.env.PORT || 8082;
const BASEURL2 =
  process.env.BASEURL2 ||
  "http://finalapp-env.eba-2hqpicun.ap-south-1.elasticbeanstalk.com";

// Serve static files from the dist folders of admin and frontend
app.use(
  "/admin",
  express.static(path.join(__dirname, "./Autoscan_Admin/build"))
);
app.use("/", express.static(path.join(__dirname, "./Autoscan_Frontend/build")));

// Fallback to index.html for SPA routing
app.get("/admin/*", (req, res) => {
  console.log("helo");
  res.sendFile(path.resolve(__dirname, "./Autoscan_Admin/build", "index.html"));
});

app.get("/*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "./Autoscan_Frontend/build", "index.html")
  );
});

app.listen(PORT, () => {
  console.log(`Server listening at ${BASEURL2}`);
});
