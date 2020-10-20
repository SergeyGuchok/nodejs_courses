import {
  getUsers as getUsersFromDB,
  getUserById as getUserFromDBById,
  getUserByLogin as getUserFromDBByLogin,
  createUser as createUserInDB,
  searchUsers as searchUsersFromDB,
  updateUser as updateUserInDB,
  removeUser as removeUserFromDB
} from '../data-access/index.js'

class UserService {
  static async CreateUser(newUserInfo) {
    const isUserExists = await getUserFromDBByLogin(newUserInfo.login)

    if (isUserExists.length) {
      return
    }

    return await createUserInDB(newUserInfo)
  }

  static async GetUsers() {
    const users = await getUsersFromDB()

    return users.map((u) => ({ userInfo: u.dataValues }))
  }

  static async GetUser(userId) {
    const [user] = await getUserFromDBById(userId)

    return user.dataValues
  }

  static async RemoveUser(userId) {
    return await removeUserFromDB(userId)
  }

  static async SearchUser(substring) {
    const users = await searchUsersFromDB(substring)

    return users.map((u) => ({ userInfo: u.dataValues }))
  }

  static async UpdateUser(userInfo, userId) {
    return await updateUserInDB(userId, userInfo)
  }
}

export default UserService
