const {StatusCodes} = require("http-status-codes");

function errorHandlerMiddleware(err, req, res, next) {
    if (err.code === 11000) {
        return res.status(StatusCodes.BAD_REQUEST).json({msg: `duplicate value of ${Object.keys(err.keyValue)}`});
    }
    res.json(err.message);
}

module.exports = {errorHandlerMiddleware};