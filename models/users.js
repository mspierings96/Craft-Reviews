const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection-sequeilze');


class Users extends Model {}

Users.init(
    {   id: {type: DataTypes.INTEGER,
        allowNull:null,
        primaryKey:true,
        autoIncrement: true},
        userName: {type: DataTypes.STRING,
           allowNull: false},
        passwords: {type: DataTypes.STRING,
            allowNull: false}
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true

    }
);

module.exports = Users;

// module.exports = (sequelize, DataTypes)=>{
//         const Users =  sequelize.define('users', {
//             userName: {type: DataTypes.STRING,
//             allowNull: false},
//             password: {type: DataTypes.TEXT,
//             allowNull: false}
//         })
//         return Users;
//     }
