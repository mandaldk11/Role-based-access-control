const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    try {
        const { username, password, role } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ username, password: hashedPassword, role })
        await newUser.save()
        res.status(201).json({ msg: "registration successful...", newUser })
    } catch (error) {
        res.status(400).json({ msg: "somwthing went wrong...", error })
    }

}

const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(404).json({ msg: "user not found..." })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(404).json({ msg: "incorrect password..." })
        }

        const token = await jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: "1h" });
        res.status(200).json({ token })

    } catch (error) {
        console.log(error)
        return res.status(404).json({ error })
    }
}

module.exports = { register, login }