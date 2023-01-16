const ClientError = require('../../exceptions/ClientError');

class AuthenticationHandler{
    constructor(service, usersService, tokenManager) {
        this._service = service;
        this._usersService = usersService;
        this._tokenManager = tokenManager;

        this.userAuthenticationLogin = this.userAuthenticationLogin.bind(this);
        this.regenerateAccessToken = this.regenerateAccessToken.bind(this);
        this.deleteAuthenticationUser = this.deleteAuthenticationUser.bind(this);
    }

    async userAuthenticationLogin(request, h){
        try{
            const {username, password} = request.payload;
            const userId = await this._usersService.verifyCridential(username, password);
            const accessToken = await this._tokenManager.generateAccessToken({userId});
            const refreshToken = await this._tokenManager.generateRefreshToken({userId});
            await this._service.registerRefreshToken(refreshToken);

            const response = h.response({
                status: 'success',
                data:{
                    AccessToken: accessToken,
                    RefreshToken: refreshToken
                }
            });
            response.code(200);
            return response;

        }catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            const response = h.response({
                status: 'error',
                message: 'server is under maintain',
            })
            response.code(500);
            console.error(error)
            return response;
        }
    }

    async regenerateAccessToken(request, h){
        try {
            const refreshToken = request.payload;
            await this._service.isExistRefreshToken(refreshToken);
            const {userId} = await this._tokenManager.verifyRefreshToken(refreshToken);
            const accessToken = await this._tokenManager.generateAccessToken({userId});

            const response = h.response({
                status: 'success',
                data:{
                    AccessToken: accessToken,
                },
            });
            response.code(200);
            return response;

        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            const response = h.response({
                status: 'error',
                message: 'server is under maintain',
            })
            response.code(500);
            console.error(error)
            return response;
        }
    }

    async deleteAuthenticationUser(request, h){
        try {
            const {refreshToken} = request.payload;
            await this._service.isExistRefreshToken(refreshToken);
            await this._service.deleteRefreshToken(refreshToken);
            return {
                status: 'success',
                message: 'refresh token deleted'
            }
        }catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            const response = h.response({
                status: 'error',
                message: 'server is under maintain',
            })
            response.code(500);
            console.error(error)
            return response;
        }
    }
}

module.exports = AuthenticationHandler;
