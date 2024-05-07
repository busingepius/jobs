const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide the name"],
        trim: true,
        maxlength: [50, "name must be less than 5o words"],
        minlength: 3,
    },
    email: {
        type: String,
        required: [true, "must provide a password"],
        unique: [true, "email already registered provide a different email"],
        trim: true,
        match: [
            /^([a-z0-9._+\-]+@+[a-z0-9.\-]+\.+[a-z]{2,3})$/,
            "provide a valid email",
        ],
    },
    password: {
        type: String,
        required: [true, "please provide a password"],
        minlength: [4, "password too short"],
    },
});

UserSchema.methods.createJWT = function () {
    return jwt.sign(
        {userName: this.name, userID: this._id},
        "JWT_SECRET",
        {expiresIn: "30d"},
    );
};

UserSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
});

UserSchema.methods.comparePassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
};

module.exports = mongoose.model("User", UserSchema);