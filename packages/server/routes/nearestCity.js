var axios = require("axios");
var express = require("express");
var router = express.Router();
var apc = require("air-port-codes-node");



router.get("/getNearestCity", async (req, res, next) => {
	const API_KEY = "AIzaSyA7ly7P0GNHtWO-wfAR5DWrsE8qDyb_OgA";
    
    const { city } = req.query;


    var nearest_airport,
        longitude,
        latitude;

    // https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
    var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${API_KEY}`

    await axios.get(url).then(({data}) => {
        latitude = data.results.geometry.location.lat;
        longitude = data.results.geometry.location.lng;
    });

    // https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.712784,-74.005941&rankby=distance&type=airport&key=AIzaSyA7ly7P0GNHtWO-wfAR5DWrsE8qDyb_OgA
    url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=50000&type=airport&key=${API_KEY}`
    

    await axios.get(url).then(({data}) => {
        nearest_airport_name = data.results[2].address_components[3].long_name;
    });

    var search_query = nearest_airport_name + " code";
    // airport_API_KEY = "c7d0ba4e31";
    var search_engine_ID = "9e88c5cc7164df494";

    // https://www.googleapis.com/customsearch/v1?key=AIzaSyA7ly7P0GNHtWO-wfAR5DWrsE8qDyb_OgA&cx=9e88c5cc7164df494&q=John F. Kennedy International Airport code
    url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${search_engine_ID}&q=${search_query}`


    await axios.get(url).then(({data}) => {
        airport_iaat = data.items[0].hcard[0].nickname
    });
    
    // TODO: Reimplement conversion to iaat with better api

    // https://www.air-port-codes.com/api/v1/multi?APC-Auth=c7d0ba4e31&term=jfk
    // var apcm = new apc('multi', {key : 'c7d0ba4e31', limit: 7});
 
    // // handle successful response
    // apcm.onSuccess = function (data) {
    //     console.log(data);
    // };
    
    // // handle response error
    // apcm.onError = function (data) {
    //     console.log(data.message);
    // };
    
    // // makes the request to get the airport data
    // apcm.request('new yo');

    const return_val = {
        airport_iaat : airport_iaat,
    };

    res.json(return_val);

});


module.exports = router;