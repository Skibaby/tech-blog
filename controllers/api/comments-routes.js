const express = require('express');
const router = express.Router();
const { Comments, User } = require('../../models');


router.get("/", async (req, res) => {
    try {
      const commentData = await Comments.findAll({ include: User })
      res.json(commentData)
    } catch (err) {
      console.log(err)
    }
  })

  router.post('/', async (req, res) => {
    try {
      const dbCommentsData = await Comments.create({
        contents: req.body.contents,
        blogId: req.body.blogId,
        userId: req.session.userid,
      });
  
      const currentUser = await User.findAll({
        where: {id: req.session.userid},
        attributes: ["name"]
      })
  
      const userComment = {
        user: currentUser,
        comment: dbCommentsData
      }
  
      res.json(userComment)
  
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });


module.exports = router;
