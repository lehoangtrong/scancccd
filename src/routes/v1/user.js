import express from "express";
import * as controllers from "../../controllers";
import { verify_token, verify_role } from "../../middlewares/verify_token.js";

const router = express.Router();

router.post('/add',
    // verify_token,
    // verify_role(["admin"]),
    controllers.addUserController
    /*
        #swagger.requestBody = {
            "required": true,
            "content": {
                "application/json": {
                    "schema": {
                        "type": "object",
                        "properties": {
                            "CCCD": {
                                "type": "string"
                            },
                            "Date_Of_Birth": {
                                "type": "string",
                                "format": "date"
                            },
                            "Date_Of_Expiry": {
                                "type": "string",
                                "format": "date"
                            },
                            "Date_Of_Scan": {
                                "type": "string",
                                "format": "date-time"
                            },
                            "Event": {
                                "type": "string"
                            },
                            "Full_Name": {
                                "type": "string"
                            },
                            "Nationality": {
                                "type": "string"
                            },
                            "Place_Of_Origin": {
                                "type": "string"
                            },
                            "Place_Of_Residence": {
                                "type": "string"
                            },
                            "Sex": {
                                "type": "string"
                            },
                            "Status": {
                                "type": "string"
                            }
                        },
                        "required": ["username", "email", "password", "CCCD", "Full_Name", "Nationality", "Sex", "Status"]
                    }
                }
            }
        }
    */
);

router.get('/get/:CCCD',
    verify_token,
    verify_role(["admin"]),
    controllers.getUserController
    /*
        #swagger.parameters['CCCD'] = {
            "in": "path",
            "description": "CCCD of user",
            "required": true,
            "type": "string"
        }
    */
);

module.exports = router;