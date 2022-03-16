const router = require('express').Router();
const basicAuth = require('../middleware/basicauth');

router.post('/signin', basicAuth, signinUser);

function signinUser(req, res) {
    let token = req.token;
    let day = 86400000;
    res.cookie('remember token', token, {
        expires: new Date(Date.now() + day),
        httpOnly: true,
    });
    res.status(201).send(token);
}

module.exports = router;