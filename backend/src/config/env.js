const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES: process.env.JWT_EXPIRES || "1d",
  AES_SECRET: process.env.AES_SECRET,
  NODE_ENV: process.env.NODE_ENV || "development",
};
