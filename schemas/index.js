// mongoose 라이브러리 가져오기
const mongoose = require("mongoose");

// 설치한 몽고디비에 접근, 에러가 있으면 에러 말하기
// 여기서 .connect에 있는 부분은 저랑 똑같은 주소를 쓰실 필요없습니다 바꾸셔도 됩니다.

// 참고 터미널에서 node -v 했는데 17버전 이상이다 하면
// localhost:27017를 지우고 127.0.0.1을 넣으세요 ex) mongodb://127.0.0.1//하고자하는 이름
const connect = () => {
  mongoose
    .connect("mongodb://localhost:27017/aaa")
    .catch(err => console.log(err));
};

// 몽구스의 연결이 실패할 경우 에러 말해주는거
mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err);
});

// 현재 모듈을 내보내 줌
module.exports = connect;