const logger = require("./utils/logger");
const mongoose = require("mongoose");
var fs = require("fs");
var https = require("https");

const utils = require("./utils_flight_now");

/* logger.log({
    level: 'info',
    message: 'open flightCRM application'
  }); */

const express = require("express");
const cookieParser = require("cookie-parser");
const anonymousRoutes = require("./routes/anonymousRoutes");
const adminRoutes = require("./routes/adminRoutes");
const loginRoutes = require("./routes/loginRoutes");
const signupRoutes = require("./routes/signupRoutes");
const airlineRoutes = require("./routes/airlinesRoutes");
const customerRoutes = require("./routes/customersRoutes");

const {
  requireAuth,
  checkUser,
  isLogin,
} = require("./middleware/authMiddleware");
const authRoute = require("./middleware/auth");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
    withCredentials: true,
  })
);

// database connection
const dbURI =
  "mongodb+srv://asma:BqBKeS6FSZ2i5Cr9@int2021.xduzl.mongodb.net/node-auth";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    //console.log(result.connection) ;

    https
      .createServer(
        {
          key: fs.readFileSync("server.key"),
          cert: fs.readFileSync("server.cert"),
        },
        app
      )
      .listen(3000, () => {
        // for chacking search page flights.
        utils.insert24hourNowFlights();

        console.log(`click on https://localhost:${port}`);
        logger.log({
          level: "info",
          message: `connected to host on port: ${port}`,
        });
      });
  })
  .catch((err) => {
    logger.log({
      level: "error",
      message: `error connect to server:,${err}`,
    });
  });

app.get("*", checkUser);
app.use("/", loginRoutes);
app.use("/", signupRoutes);
app.use("/anonymous/api", anonymousRoutes);
app.use("/admin/api", adminRoutes);
app.use("/customers/api", customerRoutes);
app.use("/airlines/api", airlineRoutes);
