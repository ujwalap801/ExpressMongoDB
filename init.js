const mongoose = require('mongoose');
const Chat = require("./models/chat.js");

main().then(() => {
    console.log("Connection is successful");

    let allChats = [
        {
            from: "Alice",
            to: "Bob",
            msg: "Hey Bob, did you finish the project?",
            created_at: new Date(),
        },
        {
            from: "Bob",
            to: "Alice",
            msg: "Not yet, I’m working on it. How about you?",
            created_at: new Date(),
        },
        {
            from: "Charlie",
            to: "Diana",
            msg: "Hi Diana! Are we still on for the meeting?",
            created_at: new Date(),
        },
        {
            from: "Diana",
            to: "Charlie",
            msg: "Yes, let’s meet at 3 PM.",
            created_at: new Date(),
        },
        {
            from: "Eve",
            to: "Frank",
            msg: "Frank, can you send me the slides for the presentation?",
            created_at: new Date(),
        },
        {
            from: "Frank",
            to: "Eve",
            msg: "Sure, I’ll send them over shortly.",
            created_at: new Date(),
        },
        {
            from: "Grace",
            to: "Hank",
            msg: "Hank, have you heard back from the client?",
            created_at: new Date(),
        },
        {
            from: "Hank",
            to: "Grace",
            msg: "Not yet, but I’ll follow up with them.",
            created_at: new Date(),
        },
    ];

    // Inserting all chats into the database
    Chat.insertMany(allChats)
        .then(() => {
            console.log("All chats have been inserted successfully");
        })
        .catch(err => {
            console.error("Error inserting chats:", err);
        });

})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

