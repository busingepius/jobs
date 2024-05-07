const authRouter = require("express").Router();
const {login,register} = require("../controllers/authControllers");

authRouter.route("/login").post(login);
authRouter.route("/register").post(register);

module.exports = {authRouter};