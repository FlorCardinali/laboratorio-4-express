const express = require('express')

class Server {
    constructor(){
        this.port = process.env.PORT || 3000;
        this.app = express();
        this.routers();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`);
          });
    }


    routers() {
        this.app.get('/', (req, res) => {
            res.send('Hello World!');
          })
    }
}
module.exports = Server;


