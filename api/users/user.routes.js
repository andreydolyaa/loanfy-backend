const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getUser, getUsers, deleteUser, updateUser, addUser } = require('./user.controller')
const router = express.Router()


router.get('/', getUsers)
router.post('/', addUser)
router.get('/:id', getUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
// router.delete('/:id', requireAuth, requireAdmin, deleteUser)

module.exports = router;