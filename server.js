const server =require("./express")()
const  {port}  = require('./config');


server.listen(port, async()=>{
    console.log(`server listening at http://localhost:${port}`)
})


