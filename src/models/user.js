const { Model } = require("sequelize");

"use strict";

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.belongsToMany(models.Event, {
                through: "Attendance",
                foreignKey: "CCCD",
                otherKey: "event_id",
            });
        }
    }

    User.init(
        {
            CCCD: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
            },
            Date_Of_Birth: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            Date_Of_Expiry: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            Date_Of_Scan: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            Event: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Full_Name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Nationality: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Place_Of_Origin: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Place_Of_Residence: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Sex: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Status: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "User",
            tableName: "User",
            timestamps: false,
        }
    );

    return User;
};