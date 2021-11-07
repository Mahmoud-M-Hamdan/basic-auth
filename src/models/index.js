'use strict';



const {Sequelize,DataTypes} = require('sequelize');

require('dotenv').config();

const DATABASE_URL = process.env.NODE_ENV = 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

let sequelizeOptions = process.env.NODE_ENV = 'production' ? {
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        }
      }
} : {};

let sequelize = new Sequelize(DATABASE_URL,sequelizeOptions);



const User = require('./user.model');


module.exports = {
    db: sequelize,
    User: User(sequelize, DataTypes)
}