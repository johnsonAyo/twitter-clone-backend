import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
    tweetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

export default Bookmark;