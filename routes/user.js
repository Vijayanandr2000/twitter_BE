const { 
    create,
    follow,
    unfollow,
    findFollowing,
    findAllNewsFeed,
    findFollower
} = require('../controllers/activity');
const { authJwt } = require('../middleware')

module.exports = function(app) {
    app.post('/tweet', [authJwt.verifyToken], create)
    app.post('/follow', [authJwt.verifyToken], follow)
    app.post('/unfollow', [authJwt.verifyToken], unfollow)
    app.get('/findfollower', [authJwt.verifyToken], findFollowing)
    app.get('/findfollowing', [authJwt.verifyToken], findFollower)
    app.get('/findAllNewsFeed/:pagenumber', [authJwt.verifyToken], findAllNewsFeed)
}