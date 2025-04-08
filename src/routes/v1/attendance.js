import express from "express";
import * as controllers from "../../controllers";
import { verify_token, verify_role } from "../../middlewares/verify_token.js";

const router = express.Router();

router.post('/add',
    verify_token,
    verify_role(["admin"]),
    controllers.addAttendanceController
    /*
        #swagger.requestBody = {
            "required": true,
            "content": {
                "application/json": {
                    "schema": {
                        "type": "object",
                        "properties": {
                            "event_id": {
                                "type": "string"
                            },
                            "CCCD": {
                                "type": "string"
                            },
                            "status": {
                                "type": "string",
                                "enum": ["present", "absent"]
                            }
                        },
                        "required": ["event_id", "CCCD", "status"]
                    }
                }
            }
        }
    */
);

router.get('/get/:event_id',
    verify_token,
    verify_role(["admin"]),
    controllers.getAttendanceController
    /*
        #swagger.parameters['event_id'] = {
            "in": "path",
            "description": "ID of event",
            "required": true,
            "type": "string"
        }
    */
);

module.exports = router;