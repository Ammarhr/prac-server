const express = require('express');
const router = express.Router();
const user = require('../users/user_model');
const userDataFlow = require('../user-data-flow');

router.post('/signup', signupUser);

async function signupUser(req, res) {
    let userInfo = req.body;
    userDataFlow.hashPassword(userInfo.user_password).then((pass) => {

            let userData = {
                    user_name: userInfo.user_name,
                    user_password: pass,
                    email: userInfo.email
                }
                // return user.deletAll().then(() => {

            return user.create(userData).then((results) => {

                let token = userDataFlow.getToken(results);
                let day = 86400000;

                res.cookie('user_token', token, {
                    expires: new Date(Date.now() + day),
                    httpOnly: true
                })
                res.status(201).send(token);
            }).catch((err) => {

                res.status(401).send(err);
            })
        })
        // })
}

module.exports = router;