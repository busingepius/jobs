function notFoundMiddleware(req, res)  {
    res.send("not found !!!");
}

module.exports = {notFoundMiddleware};