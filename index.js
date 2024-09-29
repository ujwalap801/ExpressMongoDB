const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path= require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));

app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"))

let port =8080;


main().then((res)=>
{
    console.log("connection is succesful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

// INDEX ROUTE
app.get("/chats", async(req,res)=>
{

     let chatsdata = await Chat.find();
     res.render("index",{chatsdata});

})

// NEW ROUTE
app.get("/chats/new",(req,res)=>
{
    res.render("new");
});

// CREATE ROUTE
app.post("/chats",(req,res)=>
{
    let {from,to,msg}= req.body;
    // Created newchat
    let newChat = new Chat(
        {
            from:from,
            to:to,
            msg:msg,
            created_at:new Date()
        }
    )
    // save the newchat in mongoDB
    newChat.save().then((res)=>
    {
        console.log(res);
        }).catch((err)=>
        {
            console.log(err);
        })
    res.redirect("/chats");
})


//EDIT ROUTE
app.get("/chats/:id/edit",async(req,res)=>
{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit",{chat});
})

// UPDATE ROUTE
app.put("/chats/:id",(req,res)=>
{
    let {id} = req.params;
    let {msg} = req.body;
    let updatedChat = Chat.findByIdAndUpdate(
        id,
        {msg},
        { runValidators: true, new: true })

    console.log(updatedChat);
    res.redirect("/chats");
});


// DELETE ROUTE
// app.delete("chats/:id",async(req,res)=>
// {
    
//     let {id} = req.params;
//     let deletedChat=  await Chat.findByIdAndDelete(id);
//     console.log(deletedChat);
//     res.redirect("/chats");
// })


app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params;
        let deletedChat = await Chat.findByIdAndDelete(id);
       
        console.log("Deleted chat:", deletedChat);
        res.redirect("/chats");
  
});
app.listen(port,()=>
{
    console.log(`app is listening to ${port}`);
})