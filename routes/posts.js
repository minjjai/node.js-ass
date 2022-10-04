const express = require("express");
const router = express.Router();
const Posts = require("../schemas/post.js");

router.post("/posts", async (req, res) => {
    const { user, password, title, content } = req.body;
    
    await Posts.create({
        user: user,
        password: password,
        title: title,
        content: content
    })

     res.json({result: "success"});
});

// 게시글 조회 GET ( ex) localhost:3000/api/posts )
router.get("/posts", async (req, res) => {
        const postAll = await Posts.find().sort({Date: -1});
       console.log(postAll);
        const posts = postAll.map((post) => {
            return{
                user: post.user,
                password: post.password,
                title: post.title,
                content: post.content,
                postId: post._id,
                Date: post.Date
            };
        });
        res.json({ posts : posts });

});

// 게시글 상세 조회 GET ( ex) localhost:3000/api/posts/postid값 )
router.get("/posts/:_postsId", async (req, res) => {
    const {_postsId} = req.params

    const posts = await Posts.find({_id: _postsId});
    //findOne
    // const {user, password, title, content, Date} = posts
    // const post = { postId, user, password, title, content, Date}
    // res.json({post})

    const post = posts.map((post) => {
        return{
            user: post.user,
            password: post.password,
            title: post.title,
            content: post.content,
            postId: post._id,
            Date: post.Date
        };
    })
    res.json({post})
});

    // 게시글 수정 PUT ( ex) localhost:3000/api/posts/postid값 )
router.put("/posts/:_postsId", async (req, res) => {
    const {_postsId} = req.params
    const { user, password, title, content } = req.body

    const posts = await Posts.find({_id: _postsId});

    if( posts[0].password === password ){
        await Posts.updateOne( {_id: _postsId}, {$set: {user, password, title, content}});
    } // updateOne( 바꿀데이터, 수정한 내용 )
    else { 
        res.json({err: "비밀번호가 일치하지 않습니다"}); }

    res.json({ success: posts });
});

    
// 게시글 삭제 DELETE ( ex) localhost:3000/api/posts/postid값 )
router.delete("/posts/:_postsId", async (req, res) => {
    const {_postsId} = req.params;
    const {password} = req.body

    const posts = await Posts.find({_id: _postsId});
    if( posts[0].password === password){
        await Posts.deleteOne({_id: _postsId});
    }
    else{
        res.json({err: "비밀번호가 일치하지 않습니다."});
    }
    res.json({result: "success" });
});

module.exports = router;