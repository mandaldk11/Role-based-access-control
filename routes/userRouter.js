const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/authMIddleware')
const authRole = require('../middlewares/roleMiddleware')
// only admin can access-
router.get('/admin', verifyToken, authRole("admin"), (req, res) => {
    res.json({ msg: 'welcome admin...' })
})

// both admin  and  manager can access-
router.get('/manager', verifyToken, authRole("admin", "manager"), (req, res) => {
    res.json({ msg: 'welcome manager...' })
})

// all can access-
router.get('/user', verifyToken, authRole("admin", "manager", "user"), (req, res) => {
    res.json({ msg: 'welcome user...' })
})

module.exports = router