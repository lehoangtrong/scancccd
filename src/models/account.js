"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Account extends Model {
        static associate(models) {
            // define association here

        }
    }

    Account.init(
        {
            user_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            role: {
                type: DataTypes.ENUM("admin", "user"),
                defaultValue: "user",
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            status: {
                type: DataTypes.ENUM("active", "inactive"),
                defaultValue: "active",
                setStatus(value) {
                    if (value === "active" || value === "inactive") {
                        this.setDataValue("status", value);
                    }
                }
            },
        },
        {
            sequelize,
            modelName: "Account",
            tableName: "Account",
            timestamps: true,
            underscored: true,
        }
    );

    return Account;
};