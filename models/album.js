const sequelize = require('./../database/sequelize.js');
const Sequelize = require('sequelize');

module.exports = sequelize.define('album', {
    id: {
        field: 'AlbumId',
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    title: {
        field: 'Title',
        type: Sequelize.STRING
    }
}, {
    timestamps: false // 
});