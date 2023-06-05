const mongoose = require("mongoose");

const { Schema } = mongoose;

const urlSchema = new Schema({
    origin: {
        type: String,
        unique: true,
        required: true,
    },
    shortURL: {
        type: String,
        unique: true,
        required: true,
    },
});


module.exports = mongoose.model("Url", urlSchema);
