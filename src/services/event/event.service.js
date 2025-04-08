import db from "../../models/index";
import { Op } from "sequelize";
import { handleLimit, handleOffset, handleSortOrder } from "../../utils/handleFilter/index.js";

export const addEvent = async (eventData) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Check if the event already exists
            const existingEvent = await db.Event.findOne({
                where: { name: eventData.name },
                raw: true,
            });

            if (existingEvent) {
                return reject({
                    err: 1,
                    message: "Event already exists",
                });
            }

            // Create a new event
            const newEvent = await db.Event.create({
                name: eventData.name,
                description: eventData.description,
                start_time: eventData.start_time,
                end_time: eventData.end_time,
                location: eventData.location,
            });

            resolve({
                err: 0,
                message: "Event created successfully",
                event: newEvent,
            });
        } catch (error) {
            reject(error);
        }
    });
}

export const getEvent = async (eventId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const event = await db.Event.findOne({
                where: { event_id: eventId },
                raw: true,
            });

            if (!event) {
                return reject({
                    err: 1,
                    message: "Event not found",
                });
            }

            resolve({
                err: 0,
                message: "Event retrieved successfully",
                event,
            });
        } catch (error) {
            reject(error);
        }
    });
}
export const getAllEvent = async ({ page, limit, order }) => {
    return new Promise(async (resolve, reject) => {
        try {

            const events = await db.Event.findAndCountAll({
                limit: handleLimit(limit),
                offset: handleOffset(page, limit),
                order: [handleSortOrder(order, "name")],
                raw: true,
            });

            resolve({
                err: 0,
                message: "Events retrieved successfully",
                events,
            });
        } catch (error) {
            reject(error);
        }
    });
};