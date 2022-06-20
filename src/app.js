const express =  require ("express");
const path =  require("path");
const hbs =  require("hbs");
require("./db/conn");
const User = require("./models/users");


// using a constant to store all properties of express in it 
const app = express();
// Setting port to which our page will connect
const port = process.env.PORT || 3001 ; 
// Creating path to use for middleware aka static serve of website
const static_path = path.join(__dirname,"../public");


// Using View Engine aka hbs
const views_path =path.join(__dirname , "../templates/views");

const partialspath = path.join(__dirname , "../templates/partials");
// Bootstrap path 
app.use('/css', express.static(path.join(__dirname , "../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname , "../node_modules/bootstrap/dist/js")));
app.use('/jq', express.static(path.join(__dirname,"../node_modules/jquery/dist")));

// This is middleware before executing ap.get("/")
app.use(express.urlencoded({extended:false}))
app.use(express.static(static_path));
app.set("view engine", "hbs");
 app.set("views", views_path);
 hbs.registerPartials(partialspath);


// Sending a response to server 

app.get("/", (req,res)=>{
    res.render("index");
})

// Contact storing data to database
app.post("/contact" , async(req,res)=>{
    try{
    //   res.send(req.body);
      const userData = new User(req.body);
      await userData.save();
      res.status(201).render("index");
    }catch(err){
        res.status(500).send(err);
    }
})
app.get("*", (req ,res)=>{

    res.render("error");
})



// connecting to our port 
app.listen(port,()=>{
    console.log(`listening to ${port}`);
})