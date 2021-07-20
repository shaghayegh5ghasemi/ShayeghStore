class User{
    constructor(username,pass,firstname,lastname,address){
        this.username = username
        this.pass = pass;
        this.firstname = firstname;
        this.lastname = lastname;
        this.address = address;
        this.balance = 0;
    }
}

module.exports = User;