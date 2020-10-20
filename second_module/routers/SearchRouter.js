import express from 'express'
import UserService from '../services/User.js'

const SearchRouter = express.Router()

SearchRouter.get('/', async (req, res) => {
  const { substring, limit } = req.query

  const users = await UserService.SearchUser(substring)

  if (!users.length) {
    res.send('No users')
    res.end().status(404)
    return
  }

  res.send(JSON.stringify(users.slice(0, limit)))
  res.end().status(200)
})

export default SearchRouter
