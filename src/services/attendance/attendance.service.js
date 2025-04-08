import db from "../../models/index.js";

export const addAttendance = (attendanceData) => new Promise(async (resolve, reject) => {
    try {
        const existingEvent = await db.Event.findOne({
            where: { event_id: attendanceData.event_id },
            raw: true,
        });

        if (!existingEvent) {
            return reject({
                err: 1,
                message: "Event does not exist",
            });
        }

        const existingUser = await db.User.findOne({
            where: { CCCD: attendanceData.CCCD },
            raw: true,
        });

        if (!existingUser) {
            return reject({
                err: 1,
                message: "User does not exist",
            });
        }

        const existingAttendance = await db.Attendance.findOne({
            where: {
                event_id: attendanceData.event_id,
                CCCD: attendanceData.CCCD,
            },
            raw: true,
        });

        if (existingAttendance) {
            return reject({
                err: 1,
                message: "Attendance already exists",
            });
        }

        const newAttendance = await db.Attendance.create({
            event_id: attendanceData.event_id,
            CCCD: attendanceData.CCCD,
            status: attendanceData.status,
        });

        resolve({
            err: 0,
            message: "Attendance created successfully",
            attendance: newAttendance,
        });
    } catch (error) {
        reject(error);
    }
});