const {Pool} = require('pg');
const InvariantError = require('../exceptions/InvariantError');

class AuthenticationService{
    constructor() {
        this._pool = new Pool();
    }

    async registerRefreshToken(token){
        const query = {
            text: 'insert into authentication values ($1)',
            values: [token]
        }
        await this._pool.query(query);
    }

    async verifyRefreshToken(token){
        const query = {
            text: 'select token from authentication where token = $1',
            values: [token]
        }

        const result = await this._pool.query(query);
        if(!result.rows.length){
            throw new InvariantError('Refresh Token invalid');
        }
    }

    async deleteRefreshToken(token){
        const query = {
            text: 'delete from authentication where token = $1',
            values: [token]
        }
        await this._pool.query(query);
    }

}

module.exports = AuthenticationService;
