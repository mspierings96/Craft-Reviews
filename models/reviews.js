const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection-sequelize');

class Reviews extends Model {}

Reviews.init(
   {
       id: {type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey:true,
        autoIncrement:true},
       apiID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
                isNumeric: true
        }
    },
    review: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isNumeric: true
        }
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true
    }
);

    module.exports = Reviews;