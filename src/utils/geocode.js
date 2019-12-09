const request = require('request')

const geocode = (address, callback) => {

  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1IjoiYmlsbHliYXIiLCJhIjoiY2szN2NnbGd5MGEzczNic2I4YjRrYzF5eiJ9.u_FpoimuSnutxisEbIlGJQ&limit=1';

  request({
    url,
    json: true
  }, (error, {
    body
  }) => {

    if (error) {
      callback('Some error: -Pls Check your connection -pls Check URL again', undefined)
    } else if (!body.features[0]) {
      callback('PLs check the page web you after again', undefined);
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].geometry.coordinates[1],
        location: body.features[0].place_name
      })
    }

  })
}

module.exports = geocode