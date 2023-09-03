// const express = require('express');
// const router = express.Router();

// // Import any necessary models, controllers, or middleware
// const BlogController = require('../controllers/blogController');

// // Define routes
// router.get('/', BlogController.getAllBlogs);
// router.get('/:id', BlogController.getBlogById);
// router.post('/', BlogController.createBlog);
// router.put('/:id', BlogController.updateBlog);
// router.delete('/:id', BlogController.deleteBlog);

// module.exports = router;

const router = require('express').Router();
const { Blog, Comments, User } = require('../../models');


// Simulated in-memory database
const blogs = [];

// Define routes

router.get("/", async (req, res) => {
    try {
      const blogs = await Blog.findAll();
      res.json(blogs)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  })


router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findAll({
      where: {id: id},
      include: {
        model: Comments,
        include: {
          model: User,
          attributes: ['id', 'name']
        },
      } 
    });
    // console.log("blog", blog)
    res.json(blog)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
});

router.post('/create', async (req, res) => {
    if (req.session.loggedIn) {
      try {
        const dbBlogData = await Blog.create({
          title: req.body.title,
          contents: req.body.contents,
          userId: req.session.userid,
        });
  
        res.status(200).json(dbBlogData);
  
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    } else {
      res.send("Please login to create a post.")
    }
  });

  router.put('/edit', async (req, res) => {
    try {
      const dbBlogData = await Blog.update({
        title: req.body.title,
        contents: req.body.contents,
      }, {
        where: {
          id: req.session.userid,
          title: req.body.title,
        }
      });
  
      res.json(dbBlogData)
  
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params
    try {
      await Blog.destroy({
        where: {
          id: id
        }
      });
    } catch (err) {
      console.log(err)
    }
  
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

module.exports = router;
