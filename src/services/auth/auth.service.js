import jwt from "jsonwebtoken";
import db from "../../models";
import * as hashPassword from "../../utils/hashPassword";

export const loginService = ({ email, password }) =>
    new Promise(async (resolve, reject) => {
        try {
            // Find the user equal email address in the database
            const user = await db.Account.findOne({
                where: {
                    email,
                    status: "active"
                },
                raw: true,
            });

            // Check if the user exists and the password is valid
            const isPasswordValid =
                user && hashPassword.comparePassword(password, user.password);
            // If the password is valid, generate an access token

            const accessToken = isPasswordValid
                ? jwt.sign(
                    {
                        user_id: user.user_id,
                        email: user.email,
                        role: user.role,
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "1h",
                    }
                )
                : null;

            resolve({
                err: accessToken ? 0 : 1,
                message: accessToken
                    ? "Login successful"
                    : user
                        ? "Invalid password"
                        : "User not found",
                accessToken: "Bearer " + accessToken,
            });
        } catch (error) {
            reject(error);
        }
    });

export const refreshTokenService = (refreshToken) =>
    new Promise(async (resolve, reject) => {
        try {
            if (!refreshToken) {
                return resolve({
                    err: 1,
                    message: "Refresh token is required",
                });
            }

            jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
                if (err) {
                    return resolve({
                        err: 1,
                        message: "Invalid refresh token",
                    });
                }

                const user = await db.User.findOne({
                    where: {
                        user_id: decoded.user_id,
                        status: "active",
                    },
                    raw: true,
                });

                if (!user) {
                    return resolve({
                        err: 1,
                        message: "User not found",
                    });
                }

                const newAccessToken = jwt.sign(
                    {
                        user_id: user.user_id,
                        email: user.email,
                        role: user.role,
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "1h",
                    }
                );

                console.log("New access token generated:", newAccessToken);

                resolve({
                    err: 0,
                    message: "Access token refreshed successfully",
                    accessToken: "Bearer " + newAccessToken,
                });
            });
        } catch (error) {
            reject(error);
        }
    });
