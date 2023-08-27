const  express = require('express');
const userRoutes = require("./api/user-routes")

const router = express.Router();


router.use("/api/userroutes", userRoutes )






module.exports= router