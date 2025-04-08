import express from "express";
import * as controllers from "../../controllers";

const router = express.Router();

router.post(
    "/login",
    controllers.loginController
    /*
     #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        email: {
                            type: 'string',
                            example: 'admin@gmail.com'
                        },
                        password: {
                            type: 'string',
                            example: '123456'
                        }
                    },
                    required: ['email', 'password']
                }
            }
        }
    }
    #swagger.description = 'Authenticate a user using their email and password.'
    #swagger.summary = 'Login to the system'
    */
);

module.exports = router;