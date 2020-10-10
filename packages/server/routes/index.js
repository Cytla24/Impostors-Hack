var axios = require("axios");
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
	res.send({ a: "b" });
});

router.get("/getPaths", async (req, res, next) => {
	const { origin, destination } = req.query;
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

	url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin}&destinations=${destination}&mode=transit&transmit_mode=rail&key=${API_KEY}`;
	await axios.get(url).then(({ data }) => {
		console.log(data);
		rail_time = data.rows[0].elements[0].duration.text;
	});

	const mtomilesConv = 1609.344;
	const distance_val_mil = distance_val / mtomilesConv;
	var avg_speed = 500; // mph
	flight_time = Number((distance_val_mil / avg_speed).toFixed(1));
	flight_time_str = `${flight_time} hours`;

	var car_cf, rail_cf, flight_cf;
	const carRate = 0.4 / 1000; // tons/mile
	const railRate = 0.06 / 1000;
	const flightRate = 1.2 / 1000;
	car_cf = Number((carRate * distance_val_mil).toFixed(2));
	rail_cf = Number((railRate * distance_val_mil).toFixed(2));
	flight_cf = Number((flightRate * distance_val_mil).toFixed(2));
	const returnVal = {
		distance,
		destination: destination_ad,
		origin: origin_ad,
		driving_time,
		rail_time,
		flight_time: flight_time_str,
		car_cf,
		rail_cf,
		flight_cf,
	};

	res.json(returnVal);
});

module.exports = router;
