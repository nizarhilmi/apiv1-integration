const {Pool} = require('pg');
const {nanoid} = require('nanoid');
const bcrypt = require('bcrypt');
const AuthenticationError = require('../exceptions/AuthenticationError');

class UsersService{
    constructor(){
        this._pool = new Pool();
    }

    async registerUser({username, password, role}){
        const id = `user-${nanoid(8)}`;
        const encryptedPassword = await bcrypt.hash(password, 10);
        const query = {
            text : 'insert into users_account values ($1, $2, $3, $4) returning id',
            values : [id , username, encryptedPassword, role],
        }

        const result = await this._pool.query(query);
        if (!result.rows[0].id) {
            throw new Error("failed");
        }

        return result.rows[0].id;
    }

    async verifyCridential(username, password){
        const query = {
            text : 'select id, password from users_account where username = $1',
            values : [username]
        }

        const result = await  this._pool.query(query);
        const {id, password: hashedPassword} = result.rows[0];
        const isMatch = bcrypt.compare(password, hashedPassword);
        if (!isMatch){
            throw new AuthenticationError('Password invalid');
        }
        return id;
    }
}

module.exports = UsersService;
