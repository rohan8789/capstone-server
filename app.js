const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const userRouter = require('./routes/user-router');
const reguserRouter = require('./routes/reguser-router');
const adminRouter = require('./routes/admin-router')
const ngoRouter = require('./routes/ngo-router');

const app = express();


app.use(express.json());
app.use(cors());

app.use("/uploads/images", express.static(path.join("uploads", "images")));


app.use("/api/users", userRouter);
app.use("/api/regusers", reguserRouter);
app.use("/api/admin", adminRouter);
app.use("/api/ngo", ngoRouter);


mongoose
  .connect(
    `mongodb+srv://rohansinghrp180:${encodeURIComponent('Rohan@2001')}@cluster0.m9ddkh2.mongodb.net/women?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(5000, () => {
      console.log("server is up and running...");
    });
  })
  .catch((error) => {
    console.log(error);
  });
