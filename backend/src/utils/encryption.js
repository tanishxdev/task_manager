const CryptoJS = require("crypto-js");
const { AES_SECRET } = require("../config/env");

// Encrypt text using AES
const encrypt = (text) => {
  return CryptoJS.AES.encrypt(text, AES_SECRET).toString();
};

// Decrypt encrypted text
const decrypt = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, AES_SECRET);
  return bytes.toString(CryptoJS.enc.Utf8);
};

module.exports = {
  encrypt,
  decrypt,
};
