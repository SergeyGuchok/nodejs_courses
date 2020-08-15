import User from '../User/index.js'
import UsersCollection from '../collection.js'

const modifyDataForCreation = (data) => ({
    ...data,
    id: UsersCollection.length
})

export const createUser = (req, res) => {
    const { data } = req.body

    if (!data.password || !data.login || !data.age) {
        res.end('Password, Age or Login is not provided').status(400)
        return
    }

    const isUserExists = UsersCollection.filter((u) => u.login === data.login).length

    if (isUserExists) {
        res.end('User with this login already exists').status(400)
        return
    }

    const newUser = new User(modifyDataForCreation(data))
    UsersCollection.push(newUser)

    res.send('User was successfully added')
    res.end().status(200)
}

export const getUsers = (req, res) => {
    res.send(JSON.stringify(UsersCollection))
    res.end().status(200)
}

export const getUser = (req, res) => {
    const { userId } = req.params

    const user = UsersCollection.find((u) => u.id === Number(userId))

    if (!user || user.isDeleted) {
        res.send('No user with provided ID')
        res.end().status(404)
        return
    }

    res.send(JSON.stringify(user))
    res.end().status(200)
}

export const removeUser = (req, res) => {
    const { userId } = req.params

    const user = UsersCollection.find((u) => u.id === Number(userId))

    if (!user || user.isDeleted) {
        res.send('No user with provided ID')
        res.end().status(404)
        return
    }

    user.isDeleted = true

    res.send('User was successfully removed')
    res.end().status(200)
}

export const searchUser = (req, res) => {
    const { substring, limit } = req.query

    const users = UsersCollection.filter((u) => u.login.includes(substring))

    if (!users.length) {
        res.send('No users with such login substring')
        res.end().status(404)
        return
    }

    res.send(JSON.stringify(users.slice(0, limit)))
    res.end().status(200)
}

export const updateUser = (req, res) => {
    const { data } = req.body
    const { userId } = req.params

    const user = UsersCollection.find((u) => u.id === Number(userId))

    if (!user || user.isDeleted) {
        res.send('No user with provided ID')
        res.end().status(404)
        return
    }

    const updatedUser = {
        ...user,
        ...data
    }

    const oldDataUserIndex = UsersCollection.findIndex(u => u === user)

    UsersCollection.splice(oldDataUserIndex, 1)
    UsersCollection.push(updatedUser)

    res.send('User was successfully removed')
    res.end().status(200)
}
