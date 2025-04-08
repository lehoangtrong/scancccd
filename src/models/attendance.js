const { Model } = require("sequelize");

"use strict";

module.exports = (sequelize, DataTypes) => {
    class Attendance extends Model {
        static associate(models) {
            Attendance.belongsTo(models.Event, {
                foreignKey: "event_id",
                as: "event",
            });
            Attendance.belongsTo(models.User, {
                foreignKey: "CCCD",
                as: "user",
            });
        }
    }

    Attendance.init(
        {
            attendance_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            event_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            CCCD: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM("present", "absent", "excused"),
                defaultValue: "present",
                allowNull: false,
            },
            check_in_time: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            check_out_time: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "Attendance",
            tableName: "Attendance",
            timestamps: true,
            underscored: true,
        }
    );

    return Attendance;
};