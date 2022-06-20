const mongoose = require("mongoose");


// Cpnnecting to database
mongoose.connect("mongodb://localhost:27017/birthdaywishes",{
    useNewUrlParser:false,
    useUnifiedTopology:false
}).then(()=>{
    console.log("connnection succesful to mongodb database");
}).catch((err)=>{
    console.log(err);
})