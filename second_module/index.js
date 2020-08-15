import express from 'express'
import bodyParser from 'body-parser'
import routes from './routes/index.js'

const PORT = process.env.PORT || 8000
const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json('Connection successful!')
})

app.use('/users', routes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
