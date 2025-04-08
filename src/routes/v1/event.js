import express from "express";
import * as controllers from "../../controllers";
import { verify_token, verify_role } from "../../middlewares/verify_token.js";

const router = express.Router();

router.post('/add',
    verify_token,
    verify_role(["admin"]),
    controllers.addEventController
    /*
        #swagger.requestBody = {
            "required": true,
            "content": {
                "application/json": {
                    "schema": {
                        "type": "object",
                        "properties": {
                            "name": {
                                "type": "string"
                            },
                            "description": {
                                "type": "string"
                            },
                            "start_time": {
                                "type": "string",
                                "format": "date-time"
                            },
                            "end_time": {
                                "type": "string",
                                "format": "date-time"
                            },
                            "location": {
                                "type": "string"
                            }
                        },
                        "required": ["name", "description", "start_time", "end_time", "location"]
                    }
                }
            }
        }
    */
);

router.get('/get/:eventId',
    verify_token,
    verify_role(["admin"]),
    controllers.getEventController
    /*
        #swagger.parameters['eventId'] = {
            "in": "path",
            "description": "ID of event",
            "required": true,
            "type": "string"
        }
    */
);

router.get('/',
    verify_token,
    verify_role(["admin"]),
    controllers.getAllEventController
    /*
        #swagger.parameters['page'] = {
            "in": "query",
            "description": "Page number",
            "required": false,
            "type": "integer"
        },
        #swagger.parameters['limit'] = {
            "in": "query",
            "description": "Number of events per page",
            "required": false,
            "type": "integer"
        },
        #swagger.parameters['order'] = {
            description: 'Order by field',
            '@schema': {
                type: 'array',
                items: {
                    type: 'string',
                    pattern: '^(name|location|asc|desc)$',
                    example: 'name'
                }
            },
            required: false,
            explode: true
        }
    */
);

module.exports = router;