import pgk from 'sequelize'
const { Sequelize } = pgk
import UserModel from './models/User/index.js'

const mockUsers = [{
  age: 15,
  login: 'login',
  password: 'password_1',
  deleted: false
}, {
  age: 20,
  login: 'login_login',
  password: 'password_2',
  deleted: false
}, {
  age: 25,
  login: 'login_login_login',
  password: 'password_3',
  deleted: false
}]

const sq = new Sequelize('postgres://postgres:123@localhost:5432/nodejs_courses')

sq.authenticate()
  .then(async () => {
    const [results] = await sq.query('SELECT EXISTS (\n' +
      '   SELECT FROM information_schema.tables \n' +
      '   WHERE  table_schema = \'public\'\n' +
      '   AND    table_name   = \'users\'\n' +
      '   );')

    if (results[0].exists) {
      console.log('Table already exists, exiting')
      await sq.close()
      return
    }

    await sq.query('CREATE TABLE users (id SERIAL, age integer, login varchar(20), password varchar(25), deleted boolean)')

    for (const user of mockUsers) {
      await UserModel.create(user)
    }

    console.log('Table was created successfully')
    await sq.close()
  })
  .catch((error) => {
    console.log(`Error on initialization stage, error: \n ${error}`)
  })
