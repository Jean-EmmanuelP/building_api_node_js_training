const sequelize = require('./../database/sequelize.js');
const Sequelize = require('sequelize');

module.exports = sequelize.define('artist', {
    id: {
        field: 'ArtistId',
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        field: 'Name',
        type: Sequelize.STRING
    }
}, {
    timestamps: false // 
});