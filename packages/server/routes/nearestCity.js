var axios = require("axios");
var express = require("express");
var router = express.Router();
var math = require("mathjs");
var {computerArea} = require("spherical-geometry-js");
var computerArea = require("spherical-geometry-js/compute-area");


router.get("/getClosestCity", async (req, res, next) => {
	const API_KEY = "AIzaSyA7ly7P0GNHtWO-wfAR5DWrsE8qDyb_OgA";
    
    const { longitude_first, latitude_first, longitude_second, latitude_second } = req.query;

    var lat_midpoint = (latitude_first + latitude_second) / 2;
    var long_midpoint = (longitude_first + longitude_second) / 2;

    var url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat_midpoint},${long_midpoint}&key=${API_KEY}`;
    var nearest_city;

    await axios.get(url).then(({data}) => {
        nearest_city = data.results[0].address_components[3].long_name;
    });

    const return_val = {
        nearest_city : nearest_city,
    };

    res.json(return_val);
});


module.exports = router;