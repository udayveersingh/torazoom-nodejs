const mongoose = require("mongoose");
require("dotenv").config();

MONGO_URL = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_NAME}.vd0h1ey.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connection.once("open", () => {
    console.log("MongoDB is ready!");
})

mongoose.connection.on("error", (error) => {
    console.log("MongoDB Error!", error);
})

async function mongoConnect(){
    await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect(){
    await mongoose.disconnect();
}

module.exports  = {
    mongoConnect,
    mongoDisconnect,
}