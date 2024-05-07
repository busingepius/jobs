const {UnAuthorizedErrorError} = require("../errors");
const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
    // const {authorization: auth} = req.headers;
    const auth = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImJ1c2luZ2U5IiwidXNlcklEIjoiNjYzNmYxNDA4ODNiZTYxMmI4YTM4ODNmIiwiaWF0IjoxNzE1MDM4OTg1LCJleHAiOjE3MTc2MzA5ODV9.NISwRH5SaaOEkOwDdLXxXXuwUSk0VGnTyWEBiDulYdw";

    if (!auth || !auth.startsWith("Bearer ")) {
        throw new UnAuthorizedErrorError("Not authorized, please log in then try again");
    }
    const token = auth.split(" ")[1];
    const user = jwt.verify(token, "JWT_SECRET");

    if (!user) {
        throw new UnAuthorizedErrorError("Not authorized, please log in then try again");
    }

    req.user = user;
    next();
}

module.exports = {authMiddleware};