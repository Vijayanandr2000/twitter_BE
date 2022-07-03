const jwt = require('jsonwebtoken')
const db = require('../models');
const authConfig = require('../config/auth');

const secretKey = authConfig.secretKey;

const Tweet = db.tweet;
const User = db.user;
const Follower = db.follower;

const create = async(req,res) => {
    let { tweet } = req.body
    let userId = req.id;

    let tweetMsg = {
        tweet,
        userId
    }; 
    console.log(tweetMsg);
    Tweet.create(tweetMsg).then((resp) => {
        res.status(201).send({ 
            message:'Tweet posted successfully',
            data: tweetMsg,
            resp
        })
    }).catch((err) => {
        res.status(500).send({
            message: err.message,
            tweetMsg
        })
    })


}

const follow = async(req, res) => {
    let { id } = req.body;
    let userId = req.id;

    Follower.findOne({
        where: { 
            followerId: id,
            userId
        }
    }).then((user) => {
        if(user){
            res.status(400).send({
                message: 'Already following',
            })
        } else{
            let data = {
                followerId: id,
                userId
            }
            Follower.create(data).then((resp) => {
                res.status(201).send({ 
                    message:'Following successfully',
                })
            }).catch((err) => {
                res.status(500).send({
                    message: err.message,
                    tweetMsg
                })
            })
        }
    }).catch((err) => {
        res.status(500).send({
            message: err.message,
        })
    })

}

const unfollow = async(req, res) => {
    let { id } = req.body;
    let userId = req.id;

    Follower.findOne({
        where: { 
            followerId: id,
            userId
        }
    }).then((user) => {
        if(user){
            Follower.destroy({
                where: { 
                    followerId: id,
                    userId
                },
                returing: true,
            }).then((resp) => {
                res.status(201).send({ 
                    message:'Unfollowed successfully',
                    resp
                })
            }).catch((err) => {
                res.status(500).send({
                    message: err.message,
                })
            })
        } else{
            res.status(400).send({
                message: `No Follower FOUND.....! with this id ${id}`,
            })
        }
    }).catch((err) => {
        res.status(500).send({
            message: err.message,
        })
    })

}

const findAll = async(req, res) => {
    
    User.findAll().then((resp) => {
        
        if(resp.length == 0){
            return res.status(200).send({
                message:'NO USER FOUND.....!'
            });
        }
        res.status(200).send(resp);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })

    
}

const findAllNewsFeed = async(req, res) => {
    let limit = 10
    let offset =  (req.params.pagenumber - 1) * limit
    Tweet.findAll({
        order: [['updatedAt', 'DESC']],
        offset,
        limit,
    }).then((resp) => {
        
        if(resp.length == 0){
            return res.status(200).send({
                message:'NO TWEETS FOUND.....!'
            });
        }
        res.status(200).send(resp);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })

    
}

const findFollowing = async(req, res) => {
    let userId = req.id;

    User.findOne({
            where: { 
                id: userId,
            }
    }).then((user) => {
        
        if(user.length == 0){
            return res.status(200).send({
                message:'NO USER FOUND.....!'
            });
        }

        Follower.findAll({
            where: {
                userId
            }
        }).then((resp) => {
        
            if(resp.length == 0){
                return res.status(200).send({
                    message:'NO Follower FOUND.....!'
                });
            }
            res.status(200).send({
                userDetail: user,
                follower: resp
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
        

    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })

    
}

const findFollower = async(req, res) => {
    let userId = req.id;

    Follower.findAll({
            where: { 
                followerId: userId,
            }
    }).then((user) => {
        
        if(user.length == 0){
            return res.status(200).send({
                message:'NO USER Following.....!'
            });
        }

        res.status(200).send({
            follower: user
        });
        

    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })

    
}


module.exports = { 
    create,
    findAll,
    follow,
    unfollow,
    findAllNewsFeed,
    findFollowing,
    findFollower
};