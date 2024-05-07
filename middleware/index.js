const {errorHandlerMiddleware} = require("./errorHandlerMiddleare");
const {notFoundMiddleware} = require("./notFoundMiddleware");
const {authMiddleware} = require("./authMiddleware");

module.exports = {errorHandlerMiddleware,notFoundMiddleware,authMiddleware};