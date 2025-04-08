import Joi from "joi";
import { badRequest, created, internalServerError, ok } from "../../middlewares/handle_error";
import * as userService from "../../services";

export const addUserController = async (req, res) => {
    try {
        const error = Joi.object({
            CCCD: Joi.string().required(),
            Date_Of_Birth: Joi.date().required(),
            Date_Of_Expiry: Joi.date().required(),
            Date_Of_Scan: Joi.date().required(),
            Event: Joi.string().required(),
            Full_Name: Joi.string().required(),
            Nationality: Joi.string().required(),
            Place_Of_Origin: Joi.string().required(),
            Place_Of_Residence: Joi.string().required(),
            Sex: Joi.string().required(),
            Status: Joi.string().required(),
        }).validate(req.body).error;

        if (error) {
            return badRequest(res, error.details[0].message);
        }

        const response = await userService.addUserService(req.body);
        return created(res, { message: response.message, user: response.user });
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            return badRequest(res, "User already exists");
        }
        if (error.name === "SequelizeValidationError") {
            return badRequest(res, error.errors[0].message);
        }
        if (error.name === "SequelizeDatabaseError") {
            return internalServerError(res, "Database error occurred");
        }
        return internalServerError(res, error.message);
    }
}

export const getUserController = async (req, res) => {
    try {
        const error = Joi.object({
            CCCD: Joi.string().required(),
        }).validate({ CCCD: req.params.CCCD }).error;

        if (error) {
            return badRequest(res, error.details[0].message);
        }

        const response = await userService.getUserService(req.params.CCCD);

        return ok(res, { message: response.message, user: response.user });
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            return badRequest(res, "User already exists");
        }
        if (error.name === "SequelizeValidationError") {
            return badRequest(res, error.errors[0].message);
        }
        if (error.name === "SequelizeDatabaseError") {
            return internalServerError(res, "Database error occurred");
        }
        return internalServerError(res, error.message);
    }
}