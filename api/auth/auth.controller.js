
const authService = require('./auth.service');


module.exports = {
    signup,
    login,
    logout
}


async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await authService.login(email, password);
        if(user){
            req.session.user = user;
            res.json(user);
        }
        else return res.status(400);
    }
    catch (err) {
        res.status(401)
    }
}

async function signup(req, res) {
    try {
        const { email, username, password } = req.body;
        const account = await authService.signup(email, username, password);
        const user = await authService.login(email, password);
        req.session.user = user;
        res.json(user);
    }
    catch (err) {
        res.status(500)
    }
}


async function logout(req, res) {
    console.log('USER LOGGED OUT');
    try {
        req.session.destroy()
        res.send({ message: 'logged out successfully' })
    } catch (err) {
        res.status(500).send({ error: err })
    }
}