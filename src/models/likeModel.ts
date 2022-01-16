import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    postId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
})

const Like = mongoose.model("Like", likeSchema);

export default Like;