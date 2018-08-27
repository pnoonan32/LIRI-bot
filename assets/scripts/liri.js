// use: ' "node assets/scripts/liri.js" then search term' to run this program

require("dotenv").config();
const keys = require('./keys');

const Spotify = require('./../../libs/spotify');
const BandsInTown = require('./../../libs/bands');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const search = process.argv[2];
const term = process.argv.slice(3).join(" ");

const bands = new BandsInTown('codingbootcamp');
const spotify = new Spotify(keys.spotify);


class Liri {

    static async execute(command, data) {

        if(command == 'do-what-it-says') {
            const randomFile = path.join(__dirname,  '..', '..', 'random.txt');
            const result = await readFile(randomFile, 'utf8');
            
            ([command, data] = result.split(','));
            console.log(command, data);
        }

        if(command === 'concert-this')
            return this.bands(data);

        if(command === 'spotify-this-song')
            return this.spotify(data);

    }

    static async bands(data) {

        const venues = await bands.venues(data);

        for(const venue of venues) {
            console.log(`${venue.name} - ${venue.date} - ${venue.location}`);
        }
    }

    static async spotify(data) {
        const track = await spotify.search(data || 'The Sign');

        console.log(`Track: ${track.name} \nAlbum: ${track.album} \nArtist: ${track.artists}: \nLink: ${track.link}`);
    }

}

Liri.execute(search, term);
// refer to docs to set up app
