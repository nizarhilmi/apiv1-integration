class AuthenticationHandler{
    constructor(service, usersService, tokenManager) {
        this._service = service;
        this._usersService = usersService;
        this._tokenManager = tokenManager;

        this.userAuthenticationLogin = this.userAuthenticationLogin.bind(this);
    }

    async userAuthenticationLogin(request, h){
        try{
            const {username, password} = request.payload;
            const userId = await this._usersService.verifyCridential(username, password);
            const accestoken = await this._tokenManager.generateAccessToken({userId});
            const refreshToken = await this._tokenManager.generateRefreshToken({userId});
            await this._service.registerRefreshToken(refreshToken);

            const response = h.response({
                status: 'success',
                data:{
                    AccessToken: accestoken,
                    RefreshToken: refreshToken
                }
            });
            response.code(200);
            return response;

        }catch (error) {
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
