const { v4: uuidv4 } = require('uuid');
const { hashPassword } = require('../utils/hashPassword');

'use strict';


module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Account', [
            {
                user_id: uuidv4(),
                role: 'admin',
                name: 'Admin User',
                email: 'admin@gmail.com',
                password: hashPassword('123456'), // Ideally, use hashed passwords
                status: 'active',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                user_id: uuidv4(),
                role: 'user',
                name: 'User account',
                email: 'user@gmail.com',
                password: hashPassword('123456'), // Ideally, use hashed passwords
                status: 'active',
                created_at: new Date(),
                updated_at: new Date(),
            },
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Account', null, {});
    }
};