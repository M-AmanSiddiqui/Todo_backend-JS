import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        
    },
     password: {
        type: String,
        required: true,
    },
    List: [{
        type:mongoose.Types.ObjectId,
        ref: "list",
    }]
});

export default mongoose.model("User", userSchema);
