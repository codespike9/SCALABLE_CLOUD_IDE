require("dotenv").config();
const app = require("./app");
const PORT = process.env.PORT || 8002;
const SERVER_URL = `http://localhost:${PORT}`;
const mongodb = require('./mongoDbClient');

(async function () {
  try {

    await mongodb.connect();
    app.on("error",(err)=>{
            console.error("Express app initialization error: ",err);
        })

    app.listen(PORT, () => console.log("server started at : ", SERVER_URL));
  } catch (error) {
    console.error("Database connection failed!!! ", error);
  }
})();

module.exports.PORT=PORT;
