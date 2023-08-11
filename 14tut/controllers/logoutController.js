const User = require('../model/User');

const handleLogout = async (req,res) => {
    // On cilent, also delete the accessToken
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204); // No content
    const refreshToken = cookies.jwt;

    // Is refreshToken in DB?
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt',  { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204); // success, but no content
    }
    // Delete RefreshToken in DB
    foundUser.refreshToken = "";
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie('jwt',  { httpOnly: true, sameSite: 'None', secure: true }); // secure: true - only serves on https
    res.sendStatus(204);
}

module.exports = { handleLogout };