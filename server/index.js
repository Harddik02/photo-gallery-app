const express = require('express');
const cors=require("cors")
const path = require('path');
const photosRouter = require('./routers/photos');
require('./db/connection');
const website='http://localhost:3000'

const app = express();
const PORT = process.env.PORT || 3300;

app.use(
  cors({
    credentials: true,
    origin: `${website}`,
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", `${website}`);
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(photosRouter);

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
