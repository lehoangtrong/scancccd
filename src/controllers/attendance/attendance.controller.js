import Joi from "joi";
import { badRequest, created, internalServerError } from "../../middlewares/handle_error";
import * as attendanceService from "../../services";

export const addAttendanceController = async (req, res) => {
    try {
        const error = Joi.object({
            event_id: Joi.string().required(),
            CCCD: Joi.string().required(),
            status: Joi.string().valid("present", "absent").required(),
        }).validate(req.body).error;

        if (error) {
            return badRequest(res, error.details[0].message);
        }

        const attendance = await attendanceService.addAttendance(req.body);
        return created(res, { message: attendance.message, attendance: attendance.attendance });
    } catch (error) {
        console.error('Error adding attendance:', error);
        return internalServerError(res, error.message);
    }
}

export const getAttendanceController = async (req, res) => {
    try {
        const { eventId } = req.params;
        const attendance = await attendanceService.getAttendance(eventId);
        return ok(res, { message: attendance.message, attendance: attendance.attendance });
    } catch (error) {
        console.error('Error retrieving attendance:', error);
        return internalServerError(res, error.message);
    }
}
