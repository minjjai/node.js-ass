// 몽구스 연결을 위한 코드
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    postsId: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
      },
    password: {
        type: String,
        required: true,
      },
    content: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

// 모듈 밖으로 보내주는 코드
module.exports = mongoose.model("Comment", commentSchema);