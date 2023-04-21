const express = require('express');
const Playlist = require('./models/playlist');
const Artist = require('./models/artist');
const Album = require('./models/album');
const Sequelize = require('sequelize');

const { Op } = Sequelize;
const app = express();

Artist.hasMany(Album, {
    foreignKey: 'ArtistId'
});

Album.belongsTo(Artist, {
    foreignKey: 'ArtistId'
});

app.get('/api/playlists', function(request, response) {
    let filter = {};
    let { q } = request.query;

    if (q) {
        filter = {
            where: {
                name: {
                    [Op.like]: `${q}%`
                }
            }
        };
    };
    Playlist.findAll(filter).then((playlists) => {
        response.json(playlists);
    });
});

app.get('/api/playlists/:id', function(request, response) {
    let { id } = request.params;
    
    Playlist.findByPk(id).then((playlist) => {
        if (playlist) {
            response.json(playlist);
        } else {
            response.status(404).send();
        }

    })
});

app.get('/api/artists/:id', function(request, response) {
    let { id } = request.params;
    
    Artist.findByPk(id, {
        include: [Album]
    }).then((artist) => {
        if (artist) {
            response.json(artist);
        } else {
            response.status(404).send();
        }

    })
});

app.get('/api/albums/:id', function(request, response) {
    let { id } = request.params;

    Album.findByPk(id, {
        include: [Artist]
    }).then((album) => {
        if (album) {
            response.json(album);
        } else {
            response.status(404).send();
        }
    })
})

app.listen(8000);