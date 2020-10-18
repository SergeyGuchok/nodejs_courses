import pgk from 'sequelize'
const { DataTypes, Sequelize } = pgk

const sq = new Sequelize('postgres://postgres:123@localhost:5432/nodejs_courses')

const UserModel = sq.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  age: {
    type: DataTypes.INTEGER
  },
  password: {
    type: DataTypes.STRING(20)
  },
  login: {
    type: DataTypes.STRING(25)
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: false
})

export default UserModel
