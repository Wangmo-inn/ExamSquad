const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const examRoute = require("./routes/exam");
const resultRoute = require("./routes/result");
const userRoute = require("./routes/user");
const adminRoute = require("./routes/admin");
var cors = require('cors');

dotenv.config();
app.use(cors());

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected Successfully")).catch((err) => { console.error(err); });
    
  app.use(express.json());
  app.use(helmet());
  app.use(morgan("common")); 

  app.use("/api/auth", authRoute);
  app.use("/api/exam", examRoute);
  app.use("/api/result", resultRoute);
  app.use("/api/user", userRoute);
  app.use("/api/admin", adminRoute);

  app.listen(8800, () => {
    console.log("Backend server is running!");
  });

