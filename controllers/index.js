const  express = require('express');
const userRoutes = require("./api/user-routes")
const blogRoutes = require("./api/blog-routes")
const commentRoutes = require("./api/comments-routes")
const router = express.Router();


router.use("/api/users", userRoutes )
router.use("/api/blogroutes", blogRoutes)
router.use("/api/commentroutes", commentRoutes)




module.exports= router