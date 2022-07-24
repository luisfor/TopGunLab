const getConnection = require("../config/db/mysql");

class UserServices{
    constructor(){
        this.pool = getConnection();
    }

    async getUsers()
    {
        const dbUser = await this.pool;
        const result = await dbUser.query("select * from users");

        console.log(result);

        const users = result.rows;

        if (users.length === 0) {
            
        }
        dbUser.release().

    }
}