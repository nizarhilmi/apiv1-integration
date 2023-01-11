const JWT = require('@hapi/jwt');
const InvariantError = require('../exceptions/InvariantError');

const TokenGenerator = {
    generateAccessToken: (payload) => JWT.token.generate(payload, process.env.ACCESS_TOKEN_KEY ),
    generateRefreshToken: (payload) => JWT.token.generate(payload, process.env.REFRESH_TOKEN_KEY),
    verifyRefreshToken: (refreshToken) => {
        try {
            const artifacts = JWT.token.decode(refreshToken);
            JWT.token.verifySignature(artifacts, process.env.ACCESS_TOKEN_KEY);
            const { payload } = artifacts.decoded;
            return payload;
        } catch (error) {
            throw new InvariantError('Refresh token invalid');
        }
    }
}

module.exports = TokenGenerator;
