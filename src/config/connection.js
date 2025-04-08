require('dotenv').config();

import db from '../models';

const { Sequelize } = require('sequelize');
const seeders = require('../seeders/index.js');

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',
    port: process.env.DATABASE_PORT,
});

export async function connection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        const NODE_ENV = process.env.NODE_ENV || 'development';
        if (NODE_ENV === 'development') {
            db.sequelize.sync({ alter: true, force: true }).then(async () => {
                console.log('Database sync complete.');
                seeders.down(sequelize.getQueryInterface(), Sequelize).then(() => {
                    console.log('Seeders reverted successfully.');
                }).catch((error) => {
                    console.error('Error reverting seeders:', error);
                });
                // Run seeders after reverting

                seeders.up(sequelize.getQueryInterface(), Sequelize).then(() => {
                    console.log('Seeders executed successfully.');
                }).catch((error) => {
                    console.error('Error executing seeders:', error);
                });
            }).catch((error) => {
                console.error('Error syncing database:', error);
            });
        }
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export async function connectionServer() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

connection();