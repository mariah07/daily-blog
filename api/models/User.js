const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
        username:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        profilePic:{
            type:String,
            default:"https://res.cloudinary.com/mariah07/image/upload/v1656434468/daily_images/birdicon_xlszm5.jpg"
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);