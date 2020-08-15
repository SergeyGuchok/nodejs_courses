import express from 'express'
import validator from '../services/validation'
import {
    createUser,
    getUser,
    getUsers,
    removeUser,
    searchUser,
    updateUser
} from '../services/CRUD.js'

const router = express.Router()

router.get('/', getUsers)

router.get('/:userId', getUser)

router.post('/', validator.createUser, createUser)

router.get('/search', searchUser)

router.put('/:userId', updateUser)

router.delete('/:userId', removeUser)

export default router
