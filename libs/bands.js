'use strict';
const request = require('request');
const moment = require('moment');

class BandsInTownAPI {

    static get endpoints() {
        return {
            search: 'https://rest.bandsintown.com/artists/{artist}/events'
        }
    }

    constructor(appId) {
        this.appId = appId;
    }


    venues(artist) {

        return new Promise((resolve, reject) => {
    
            const url = this.constructor.endpoints.search.replace('{artist}', artist);

            const options = {
                url,
                qs: {
                    app_id: this.appId
                }
            };

            request(options, (error, response, body) => {
                if(error)
                    return reject(error);

                try {
                    const result = JSON.parse(body);

                    resolve(result.map(item => {
                        return {
                            name: item.venue.name,
                            location: `${item.venue.city}, ${item.venue.country}`,
                            date: moment(item.datetime).format('MM/DD/YYYY')
                        }  
                    }));
                } catch(e) {
                    reject(e);
                }
            });


        })
    }

}

module.exports = BandsInTownAPI;