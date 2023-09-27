const express = require('express');
const cors = require("cors");

class Server {
    constructor(){
        this.port = process.env.PORT || 3000;
        this.app = express();
        //antes que las rutas
        this.middleware();
        this.routers();
    }

    middleware (){
        this.app.use(cors());
        this.app.use(express.static('public'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`);
          });
    }


    routers() {
        this.app.use("/api/v1/demo", require("../routes/demo"));
    }
}
module.exports = Server;


