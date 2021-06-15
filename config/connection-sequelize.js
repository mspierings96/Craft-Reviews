require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
<<<<<<< HEAD
      host: 'qao3ibsa7hhgecbv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
=======
      host: 3306,
>>>>>>> 87913f8db5823316ee45fb7214156dd3b1423834
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;