import pgk from 'sequelize'
const { Op } = pgk
import UserModel from '../models/User/index.js'

const getUsers = async () => await UserModel.findAll()

const getUserById = async (userId) => await UserModel.findAll({
  where: {
    id: userId
  }
})


const getUserByLogin = async (userLogin) => await UserModel.findAll({
  where: {
    login: userLogin
  }
})

const createUser = async (newUserInfo) => await UserModel.create(newUserInfo)

const searchUsers = async (substring) => await UserModel.findAll({
  where: {
    login: {
      [Op.substring]: substring
    }
  }
})

const updateUser = async (userId, userInfo) => {
  const user = await getUserById(userId)

  if (!user || user.isDeleted) {
    return null
  }

  return await UserModel.update(userInfo, {
    where: {
      id: userId
    }
  })
}

const removeUser = async (userId) => await updateUser(userId, { deleted: true })

export {
  getUsers,
  getUserById,
  getUserByLogin,
  createUser,
  searchUsers,
  updateUser,
  removeUser
}
