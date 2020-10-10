// import axios from "axios";
var axios = require("axios");
var express = require("express");
var router = express.Router();
const { Client } = require("@googlemaps/google-maps-services-js");

const client = new Client({});

/* GET home page. */
router.get("/", (req, res, next) => {
	res.send({ a: "b" });
});

router.get("/getPaths", async (req, res, next) => {
	const { origin, destination } = req.query;
	// res.send({});
	var driving_time,
		rail_time,
		flight_time,
		distance,
		distance_val,
		origin_ad,
		destination_ad;

	// Examples of origin = "Boston,MA" or "Concord,MA"
	const API_KEY = "AIzaSyA7ly7P0GNHtWO-wfAR5DWrsE8qDyb_OgA";
	var url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin}&destinations=${destination}&key=${API_KEY}`;
	await axios.get(url).then(({ data }) => {
		driving_time = data.rows[0].elements[0].duration.text;
		origin_ad = data.origin_addresses[0];
		destination_ad = data.destination_addresses[0];
		distance = data.rows[0].elements[0].distance.text;
		distance_val = data.rows[0].elements[0].distance.value;
	});

	url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin}&destinations=${destination}&transmit_mode=rail&key=${API_KEY}`;
	await axios.get(url).then(({ data }) => {
		console.log(data);
		rail_time = data.rows[0].elements[0].duration.text;
	});

	const mtomilesConv = 1609.344;
	var avg_speed = 500; // mph
	flight_time = Number((distance_val / mtomilesConv / avg_speed).toFixed(1));
	flight_time_str = `${flight_time} hours`;

	const returnVal = {
		distance: distance,
		destination: destination_ad,
		origin: origin_ad,
		driving_time: driving_time,
		rail_time: rail_time,
		flight_time: flight_time_str,
	};

	res.json(returnVal);
});

module.exports = router;
