const client = require('../database')

class User {

    async create(record) {

        let sql = 'SELECT user_name FROM users WHERE user_name=$1;';
        let safeValue = [record.user_name]

        if (record) {
            // console.log('helooo =====>1', record, safeValue, sql);

            return client.query(sql, safeValue).then(async(dataResults) => {

                if (dataResults.rowCount > 0) {

                    throw 'the user name is not valid!';
                } else {
                    // console.log('helooo =====>2');
                    let sql = 'INSERT INTO users (user_name, user_password, email) VALUES ($1, $2, $3);';
                    let safeValue = [record.user_name, record.user_password, record.email];

                    await client.query(sql, safeValue);

                    let sql1 = 'SELECT user_name FROM users;';
                    return client.query(sql1).then((results) => {

                        // console.log('heloo40000000000000===>', results.rows.length);
                        return results.rows;
                    })
                }
            })
        }
    }
    readUser(username) {
        console.log(username, 'befor--->');
        let sql = 'SELECT * FROM users WHERE user_name=$1;';
        let saveValue = [username];
        return client.query(sql, saveValue).then((user) => {
            // console.log('this is the basic user from database---<', user);
            return user;
        }).catch(err => {
            console.log('the user not found', err);
            return err;
        })
    }
    async deletAll() {
        let sql = 'DELETE FROM users;'
        return client.query(sql).then((results) => {
            console.log(results, 'this is the deletion');
        })
    }
}

module.exports = new User();