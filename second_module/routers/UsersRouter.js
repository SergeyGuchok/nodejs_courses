import express from 'express'
import validator from '../services/validation.js'
import UserService from '../services/User.js'

const UsersRouter = express.Router()

UsersRouter.get('/', async (req, res) => {
  const users = await UserService.GetUsers()

  res.send(JSON.stringify(users))
  res.end()
})

UsersRouter.get('/:userId', async (req, res) => {
  const { userId } = req.params
  console.log(123)
  const user = await UserService.GetUser(userId)
  if (!user || user.isDeleted) {
    res.send('No user with provided ID')
    res.end().status(404)
    return
  }

  res.send(JSON.stringify(user))
  res.end().status(200)
})

UsersRouter.post('/', validator.createUser, async (req, res) => {
  console.log(req)
  const data = req.body

  if (!data.password || !data.login || !data.age) {
    res.end('Password, Age or Login is not provided').status(400)
    return
  }

  const newUser = await UserService.CreateUser(data)

  if (!newUser) {
    res.end('User with this username already exists')
    return
  }

  res.send('User was created!')
  res.end().status(200)
})

UsersRouter.put('/:userId', (req, res) => {
  const { data } = req.body
  const { userId } = req.params

  const result = UserService.UpdateUser(data, userId)

  if (!result.length) {
    res.end('No user with provided ID')
    return
  }

  res.send('User was updated')
  res.end().status(200)
})

UsersRouter.delete('/:userId', async (req, res) => {
  const { userId } = req.params

  const result = await UserService.RemoveUser(userId)

  if (!result.length) {
    res.end('No user with provided ID')
    return
  }

  res.send('User was deleted')
  res.end().status(200)
})

export default UsersRouter
