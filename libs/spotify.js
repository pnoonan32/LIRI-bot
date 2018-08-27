"use strict";

const Spotify = require("node-spotify-api");

class SpotifyWrapper {
  constructor(keys) {
    this.client = new Spotify(keys);
  }

  async search(query) {
    const data = await this.client.search({ type: "track", query: query });

    const [track] = data.tracks.items;

    const result = {
      artists: track.artists[0].name,
      album: track.album.name,
      name: track.name,
      link: track.preview_url
    };
    return result;
  }
}

module.exports = SpotifyWrapper;
