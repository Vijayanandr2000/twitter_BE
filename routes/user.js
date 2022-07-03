const { 
    create,
    follow,
    unfollow,
    findFollowing,
    findAllNewsFeed,
} = require('../controllers/activity');
const { authJwt } = require('../middleware')

module.exports = function(app) {
    app.post('/tweet', [authJwt.verifyToken], create)
    app.post('/follow', [authJwt.verifyToken], follow)
    app.post('/unfollow', [authJwt.verifyToken], unfollow)
    app.get('/findfollower', [authJwt.verifyToken], findFollowing)
    app.get('/findAllNewsFeed', [authJwt.verifyToken], findAllNewsFeed)
}