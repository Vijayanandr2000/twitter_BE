const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../models');
const authConfig = require('../config/auth');

const User = db.user;

const secretKey = authConfig.secretKey;

const signUp = (req,res) => {
    let { name, email, password } = req.body;

    if(name && email && password) {
        User.findOne({
            where: {
                email: email
            }
        }).then(async(user) => {
            if(user){
                return res.status(402).send({
                    message: "USER already exists for this Mail...!",
                })
            } else{
                if (name && email && password) {
                    User.create({
                        name,
                        email,
                        password: bcrypt.hashSync(password,10)
                    }).then(() => {
                        res.status(200).send({
                            message:"User Registered Successfully"
                        })
            
                    }).catch(err => {
                        res.status(500).send({
                            message: err.message
                        })
                    })
            
                } else{
                    res.status(400).send({
                        message: "Data's are required"
                    })
                }
            }
        }).catch(err => {
            return res.status(500).send({
                message: err.message,
            })
        })
    } else{
        res.status(400).send({
            message: "Data's are required"
        })
    }

    

}

const signIn = async (req, res) => {
    let { email,password } = req.body;

    if(email && password){
        User.findOne({
            where: {
                email: email
            }
        }).then(async(user) => {
            if(!user){
                return res.status(404).send({
                    message: 'User NOT found'
                })
            } else{
                let cmprePass = await bcrypt.compare(password,user.password)
               
                if(!cmprePass){
                    return res.status(401).send({
                        message: 'Password incorrect'
                    })
                } 
                let token = jwt.sign(
                    { id: user.id },
                    secretKey,
                    { expiresIn : '1h'}

                )
               

             

                res.status(200).send({
                    message: `Logined Successfully...${user.name}`,
                    user,
                    token,
                })

            }
        }).catch(err => {
            res.status(500).send({
                message: err.message
            })
        })

    } else{
        res.status(500).send({
            message: "Data's are required"
        })
    }

}


module.exports = {
    signUp,
    signIn
}