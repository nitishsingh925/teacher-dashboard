import connectDB from "./connectDB/db.js";
import app from "./app.js";
import { PORT } from "./utils/constant.js";

app.get('/', (req, res) => res.send("Hello Teacher Dashboard!"));

(async () =>{
    try{
        await connectDB();
        app.listen(PORT, () =>  {return console.log(`Server started on port ${PORT}`)});
    }
    catch(err){
        console.log(err)
        process.exit(1)
    }
})();
