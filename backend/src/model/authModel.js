const User = require('./user');

const loginUser = async (req, res) => {
    res.json({mssg: 'login user'})
}

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.register(username, email, password)

        const token = createToken(user._id)
        
        res.status(200).json({user, username, token})
    } catch (error) {
        res.status(400).json(error: error.message)
    }
}

module.exports = { registerUser, loginUser };