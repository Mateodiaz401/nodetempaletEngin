const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
        required: true,
        match: [/^[a-zA-Z0-9]+$/, "Solo letras y números"],
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        index: { unique: true },
    },
    image: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    tokenConfirm: {
        type: String,
        default: null,
    },
    confirm: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("User", urlSchema);