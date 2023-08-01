const { Model, DataTypes } = require(`sequelize`);
const bcrypt = require(`bcrypt`);
const sequelize = require(`../config/connection`);

class User extends Model {
    async checkPassword(loginPassword) {
        return bcrypt.compareSync(loginPassword, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /.{8,}/
            }
        }
    },
    {
        hooks: {
            async beforeCreate(userData) {
                userData.password = await bcrypt.hash(userData.password, 10);
                return userData;
            },
            async beforeUpdate(userData) {
                userData.password = await bcrypt.hash(userData.password, 10);
                return userData;
            },
        },
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: `user`,
    }
);


module.exports = User;