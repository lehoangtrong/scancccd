import Joi from "joi";
import { email, name, password } from "../../helper/joi_schema";
import {
    badRequest,
    internalServerError,
    ok,
} from "../../middlewares/handle_error";
import * as services from "../../services";

export const loginController = async (req, res) => {
    try {
        // Validate the request body
        const error = Joi.object({
            email,
            password,
        }).validate(req.body).error;
        if (error) return badRequest(res, error.message);

        // Call the service function
        const response = await services.loginService(req.body);

        // Return the response
        return ok(res, response);
    } catch (error) {
        internalServerError(res, error);
    }
};
