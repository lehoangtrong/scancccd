import Joi from "joi";
import { badRequest, created, internalServerError, ok } from "../../middlewares/handle_error";
import * as eventService from "../../services";

export const addEventController = async (req, res) => {
    try {
        const error = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
            start_time: Joi.date().iso().required(),
            end_time: Joi.date().iso().required(),
            location: Joi.string().required(),
        }).validate(req.body).error;


        if (error) {
            return badRequest(res, error.details[0].message);
        }

        const response = await eventService.addEvent(req.body);

        return created(res, { message: response.message, event: response.event });
    } catch (error) {
        console.error(error);

        return internalServerError(res, error.message);
    }
}

export const getEventController = async (req, res) => {
    try {
        const { eventId } = req.params;
        const response = await eventService.getEvent(eventId);

        return ok(res, { message: response.message, event: response.event });
    } catch (error) {
        console.error(error);

        return internalServerError(res, error.message);
    }
}

export const getAllEventController = async (req, res) => {
    try {
        const response = await eventService.getAllEvent(req.query);
        if (response.err === 1) {
            return badRequest(res, response.message);
        }

        return ok(res, { message: response.message, events: response.events });
    } catch (error) {
        console.error(error);
    }
}