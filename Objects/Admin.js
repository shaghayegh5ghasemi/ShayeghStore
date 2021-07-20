const TokenGenerator = require('uuid-token-generator');
const tokgen = new TokenGenerator();

class Admin{
    constructor(username,pass){
        this.username = username
        this.pass = pass;
        this.token = tokgen.generate();
    }
}

module.exports = Admin;