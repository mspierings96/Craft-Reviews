const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection-sequelize');
const bcrypt = require('bcrypt');


class Users extends Model { 
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw,this.passwords);
    }
}

Users.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: null,
            primaryKey: true,
            autoIncrement: true
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        passwords: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        hooks: {
            // set up beforeCreate lifecycle "hook" functionality
            async beforeCreate(newUserData) {
                newUserData.passwords = await bcrypt.hash(newUserData.passwords, 10);
                return newUserData;
            },
            // set up beforeUpdate lifecycle "hook" functionality
            async beforeUpdate(updatedUserData) {
                updatedUserData.passwords = await bcrypt.hash(updatedUserData.passwords, 10);
                return updatedUserData;
            }

        },
        sequelize,
        timestamps: false,
        freezeTableName: true

    }
);

module.exports = Users;