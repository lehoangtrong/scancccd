import { notFound } from "../../middlewares/handle_error";
import swaggerUi from 'swagger-ui-express';


function initWebRoutes(app) {
    app.use('/api/v1/auth', require('./auth.js')
        // #swagger.tags = ['Auth']
    );

    app.use('/api/v1/user', require('./user.js')
        // #swagger.tags = ['User']
    );

    app.use('/api/v1/event', require('./event.js')
        // #swagger.tags = ['Event']
    );

    app.use('/api/v1/attendance', require('./attendance.js')
        // #swagger.tags = ['Attendance']
    );

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(require('../../config/swagger-output.json')));
    // Import Swagger UI
    app.use(notFound);
}

export default initWebRoutes;
