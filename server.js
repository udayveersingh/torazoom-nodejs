const http = require("http");
const app = require("./app");

require("dotenv").config();

const mongoDb = require("./src/services/mongoDb");

const PORT = process.env.PORT || 8001;

const server = http.createServer(app);

async function startServer(){
    await mongoDb.mongoConnect();
    server.listen(PORT, () => {
        console.log(`Server listening to ${PORT}`);
    })
}

startServer();