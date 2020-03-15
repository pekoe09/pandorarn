import Sequelize from 'sequelize'

class User extends Sequelize.Model {}

User.init({
  firstNames: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  level: {
    type: Sequelize.STRING
  }
})