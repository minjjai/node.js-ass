// 몽구스 연결을 위한 코드
const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    // 요구사항을 보고 어떤 요소들이 들어가야할지 생각해보세요.
    // 힌트 : 요구 사항 + 예시 사이트 링크 부분에 예제 사이트 API명세서 참고  
        user: {
            type: String,
            required: true,
          },
        password: {
            type: String,
            required: true,
          },
        title: {
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
module.exports = mongoose.model("Posts", postSchema);