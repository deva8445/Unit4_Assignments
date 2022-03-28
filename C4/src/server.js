const app= require("./index");
const connect= require("./configs/db")

app.listen(4000,async()=>{
    try {
        await connect();
        console.log("Listening on C4 server")
    } catch (error) {
        console.log(error)
    }
})