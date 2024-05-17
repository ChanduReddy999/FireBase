const server =require("./express")()
const  {port}  = require('./config');
require('dotenv').config();

server.listen(port, async()=>{
    console.log(`server listening at http://localhost:${port}`);
    console.log(`UI docs for Client/User Testing at http://localhost:${port}/docs`);
})


