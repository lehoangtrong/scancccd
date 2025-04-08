import db from "../../models/index";

export const addUserService = (userData) =>
    new Promise(async (resolve, reject) => {
        try {
            const [user, created] = await db.User.findOrCreate({
                where: { CCCD: userData.CCCD },
                defaults: userData
            });

            if (!created) {
                resolve({ message: "User already exists", user });
            } else {
                resolve({ message: "User added successfully", user });
            }
        } catch (error) {
            reject(error);
        }
    });

export const getUserService = (CCCD) =>
    new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { CCCD }
            });

            if (!user) {
                resolve({ message: "User not found", user });
            } else {
                resolve({ message: "User retrieved successfully", user });
            }
        } catch (error) {
            reject(error);
        }
    });