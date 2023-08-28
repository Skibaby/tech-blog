const User = require('./User');
const Blog = require('./Blog');
const Comments = require('./Comments')

Blog.belongsTo(User,{
    foreignKey: 'userId',
    onDelete: 'CASCADE'
})
User.hasMany(Blog, {
    foreignKey: "userId"
})

Comments.belongsTo(Blog, {
    foreignKey: "userId",
})
Blog.hasMany(Comments,{
    foreignKey: 'blogId',
    onDelete: 'CASCADE',
})


Comments.belongsTo(User,{
    foreignKey: 'userId',
    onDelete: 'CASCADE',

})
User.hasMany(Comments, {
    foreignKey: "userId",
})
module.exports = { User, Blog, Comments };

