const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req,res) => {
    const {user, pwd} = req.body
    if (!user || !pwd) return res.status(400).json({'message':'Username and password are required.'});
    const foundUser = await User.findOne({ username: user}).exec();
    if (!foundUser) return res.sendStatus(401); // Unauthorized 
    // Evaluate Password
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        // Grab the roles
        const roles = Object.values(foundUser.roles);
        // Create JWTs
        const accessToken = jwt.sign(
            { 
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles 
                }
            }, 
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username }, 
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // Saving refresh token with current user 
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save()
        console.log(result);
        // secure: true,
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None',  maxAge: 24 * 60 * 60* 1000 });
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }

}

module.exports = { handleLogin };