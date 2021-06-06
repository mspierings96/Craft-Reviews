const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection-sequelize');

module.exports = (sequelize, DataTypes)=>{
   const Reviews = sequelize.define('reviews', {
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
    });
    return Reviews;
    
}