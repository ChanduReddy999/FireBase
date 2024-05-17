const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const swagger = require('../swagger.json');

const { endpoint } = require('../config/index');
const empRouter = require('../src/routes/index');

module.exports = () => {
    app = express();
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swagger));
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use((error, request, response, next) => {
        if (error != null) {
            return response.json({
                status: 401,
                message: "Invalid json"
            });
        }
    });
    app.use(endpoint, empRouter);
    return app;
};

