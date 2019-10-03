require('dotenv').config();
const Sequelize = require('sequelize');


const db_dev = {
    database: process.env.DEV_DATABASE,
    username: process.env.DEV_USERNAME,
    password: process.env.DEV_PASSWORD,
    dialect: 'mysql',
    host: process.env.DEV_HOST,
    port: process.env.DEV_PORT,
    define: {
        underscored: true
    }
};

const db_prod = {
    database: process.env.PROD_DATABASE,
    username: process.env.PROD_USERNAME,
    password: process.env.PROD_PASSWORD,
    dialect: 'mysql',
    host: process.env.PROD_HOST,
    port: process.env.PROD_PORT,
    define: {
        underscored: true
    }
}


const sequelize = new Sequelize(process.env.NODE_ENV == 'dev' ? db_dev : db_prod);

module.exports = sequelize;