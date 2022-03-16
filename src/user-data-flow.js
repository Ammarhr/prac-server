const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('./users/user_model');

require('dotenv').config();

class UserDataFlow {

    async hashPassword(pass) {
        if (pass) {
            return pass = await bcrypt.hash(pass, 5)
        } else {
            throw 'there is no password';
        }
    }
    getToken(user) {
        // console.log(user, 'this is the user');
        let token = jwt.sign({ user_name: user.user_name }, process.env.SECRET);
        return token;
    }
    async baicAuth(userName, pass) {
        const dataUser = await user.readUser(userName);
        // console.log('fromdatabase------------>', dataUser);
        let logPass = await dataUser.rows[0].user_password;
        let valid = await bcrypt.compare(pass, logPass)
            // console.log('the is the valid ---->', valid);
        return valid ? dataUser.rows[0] : Promise.reject();
    }
    verifyToken(token) {

    }
}

module.exports = new UserDataFlow();