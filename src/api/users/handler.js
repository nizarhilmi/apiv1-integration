
class UsersHandler{
    constructor(service){
        this._service = service;

        this.registerNewUsers = this.registerNewUsers.bind(this);
    }

    async registerNewUsers(request, h){
        try {
            
            const {id, username, password, role} = request.payload;
            const payload = await this._service.registerUser({id, username, password, role});

            const response = h.response({
                status : 'success',
                data:{
                    payload
                }
            });
            response.code(200);
            return response;

        } catch (error) {
            
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

module.exports = UsersHandler;