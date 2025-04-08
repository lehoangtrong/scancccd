const { Model } = require("sequelize");

"use strict";

module.exports = (sequelize, DataTypes) => {
    class Event extends Model {
        static associate(models) {
            Event.belongsToMany(models.User, {
                through: "Attendance",
                foreignKey: "event_id",
                otherKey: "user_id",
            });
        }
    }

    Event.init(
        {
            event_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            location: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            start_time: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            end_time: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM("scheduled", "completed", "cancelled"),
                defaultValue: "scheduled",
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Event",
            tableName: "Event",
            timestamps: true,
            underscored: true,
        }
    );

    return Event;
};