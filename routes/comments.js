// express 연결을 위한 코드
const express = require("express");

// 스키마에서 뼈대를 불러올 코드
const Comment = require("../schemas/comment");

// 라우터 연결을 위한 코드
const router = express.Router();

// 댓글 생성 POST ( ex) localhost:3000/api/comments/받아오려는 id값 )
router.post("/comments/:_postsId", async (req, res) => {
    const { user, password, content } = req.body;
    const { _postsId } = req.params
    
    if( content === "")
    { 
        res.json({"message": "댓글내용을 입력해주세요."})
    } else{
        await Comment.create({
        postsId: _postsId,
        user: user,
        password: password,
        content: content
        })
       
        res.json({"message": "댓글이 생성되었습니다."}) 
        }
});

// 댓글을 목록 보기 GET ( ex) localhost:3000/api/comments/받아오려는 id값 )
router.get("/comments/:_postsId", async (req, res) => {

    const commentAll = await Comment.find().sort({Date: -1});
    const comments = commentAll.map((com) => {
        return{
            user: com.user,
            password: com.password,
            content: com.content,
            postId: com._id,
            Date: com.Date
        };
    });
    res.json({ comments : comments });
});

// 댓글 수정 : /comments/:_commentId PUT
router.put("/comments/:_commentId", async (req, res) => {
    const {_commentId} = req.params
    const { password, content } = req.body

    const comments = await Comment.find({_id: _commentId});

    if( comments[0].password === password ){
        await Comment.updateOne( {_id: _commentId}, {$set: { password, content }});
    } // updateOne( 바꿀데이터, 수정한 내용 )
    else { 
        res.json({err: "비밀번호가 일치하지 않습니다"}); }

    res.json({ success: "댓글을 수정하였습니다." });
});



// 댓글 삭제 : /comments/:_commentId DELETE
router.delete("/comments/:_commentId", async (req, res) => {
    const {_commentId} = req.params;
    const {password} = req.body

    const comments = await Comment.find({_id: _commentId});
    if( comments[0].password === password){
        await Comment.deleteOne({_id: _commentId});
    }
    else{
        res.json({err: "비밀번호가 일치하지 않습니다."});
    }
    res.json({result: "success" });
});

module.exports = router;