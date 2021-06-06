module.exports = (sequelize, DataTypes)=>{
        const users =  sequelize.define('users', {
            userName: {type: DataTypes.STRING,
            allowNull: false},
            password: {type: DataTypes.TEXT,
            allowNull: false}
        })
        return users;
    }
