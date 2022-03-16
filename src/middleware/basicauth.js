const base64 = require('base-64');
const userDataFlow = require('../user-data-flow');

module.exports = (req, res, next) => {
    if (req.headers.authorization) {
        let basic = req.headers.authorization.split(' ').pop();
        // console.log('this is the basic auth user and pass', base64.decode(basic).split(':'));

        const [user, pass] = base64.decode(basic).split(':');
        // console.log('heloooo--------->', user, pass);

        userDataFlow.baicAuth(user, pass).then((validUser) => {
            req.token = userDataFlow.getToken(validUser);
            next();
        }).catch(err => {
            // console.log('siiiiiiiiiiiiiiiiiiiiin')
            res.status(500).send('wrong password');
        })
    } else {
        next('Invalid Login');
    }
}