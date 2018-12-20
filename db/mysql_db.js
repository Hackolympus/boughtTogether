const sequelize = require('sequelize');
const config = require('../config');
const sequelize = new Sequelize('amazon', config.username, config.password, {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false, 
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
})

const item = sequelize.define('item', {
    id: Sequelize.INTEGER,
    title: Sequelize.STRING,
    author: Sequelize.STRING,
    bookType: Sequelize.STRING,
    priceDollars : Sequelize.INTEGER,
    priceCents : Sequelize.INTEGER,
    price : Sequelize.INTEGER,
    rating : Sequelize.INTEGER,
    prime : Sequelize.BOOLEAN,
    imgUrl : Sequelize.STRING
})

const relatedItems = sequelize.define('relatedItems', {
    itemId : Sequelize.INTEGER,
})