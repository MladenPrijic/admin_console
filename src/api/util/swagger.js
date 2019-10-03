require('dotenv').config();
class Swagger {
  constructor(app) {
    this.options = {
      swaggerDefinition: {
        info: {
          description: 'Api server for  ADMIN CONSOLE',
          title: 'ADMIN CONSOLE',
          version: '1.0.0',
        },
        host: `${process.env.HOST_NAME}:8080`,
        basePath: '/api',
        produces: ['application/json', 'application/xml'],
        schemes: ['http', 'https'],
        securityDefinitions: {
          Bearer: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            description: '',
          },
        },
      },
      basedir: __dirname, //app absolute path
      files: ['../routes/**/*.js'], //Path to the API handle folder
    };
    this.expressSwagger = require('express-swagger-generator')(app);
  }

  init() {
    this.expressSwagger(this.options);
  }
}

module.exports = Swagger;
