const bcrypt = require('bcrypt');
const userService = require('../users/user.service');

module.exports = {
    signup,
    login
}



async function login(email, password) {
    if (!email || !password) throw new Error('Email and password Required!');
    const user = await userService.getByEmail(email);
    // console.log('GET BY EMAIL,',email);
    if (!user) return Promise.reject('Invaild Email or Password');
    // console.log('USER,',user);
    const match = await bcrypt.compare(password, user.password);
    // console.log('user servoce login backend ', match);
    if (!match) return 'Invaild Email or Password';
    delete user.password;
    return user;
}



async function signup(email, username, password) {
    // console.log('BACK SERVICE AUTH,', email);
    if (!email || !password || !username) return Promise.reject('Email & Password Required!');
    const hash = await bcrypt.hash(password, 10);
    return userService.add({ email, username, password: hash, isAdmin: false });
}