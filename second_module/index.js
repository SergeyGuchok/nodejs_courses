import express from 'express'
import bodyParser from 'body-parser'
import UsersRouter from './routers/UsersRouter.js'
import SearchRouter from './routers/SearchRouter.js'

const PORT = process.env.PORT || 8000
const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json('Connection successful!')
})

app.use('/users', UsersRouter)
app.use('/search', SearchRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
