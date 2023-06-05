const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const dbConnect = async () => {
    const DB_URI = process.env.DB_URI;
    try {
        await mongoose.connect(DB_URI);
        console.log('****** CONEXIÓN  CORRECTA ******');
    } catch (error) {
        console.log(error, '****** LA CONEXIÓN A FALLADO ******');
    }
}

module.exports = dbConnect;