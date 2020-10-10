var axios = require("axios");
var express = require("express");
var unirest = require("unirest");
var router = express.Router();
var csv = require('./jquery.csv.js');

/* GET home page. */
router.get("/", (req, res, next) => {
	res.send({ a: "b" });
});
/* GET Food carbon footprint score. */
router.get("/convertImage", function (req, res, next) {
	const { image } = req.query;
	var req = unirest(
		"POST",
		"https://microsoft-computer-vision3.p.rapidapi.com/tag"
	);

	req.query({
		language: "en",
	});

	req.headers({
		"x-rapidapi-host": "microsoft-computer-vision3.p.rapidapi.com",
		"x-rapidapi-key": "c6747c3e79msh7a29b84d7d64199p105efdjsnd26af7a67b01",
		"content-type": "application/json",
		accept: "application/json",
		useQueryString: true,
	});

	req.type("json");
	req.send({
		url: `${image}`,
	});
	req.end(function (response) {
		if (response.error) throw new Error(response.error);

		var image_details_classes = response.body;
		var image_details = image_details_classes["tags"];
		var food_dict = {
			pork: 1612,
			poultry: 2122,
			beef: 1212,
			lamb: 260,
			goat: 260,
			fish: 1729,
			eggs: 816,
			milk: 1277,
			cheese: 1277,
			wheat: 7155,
			rice: 2938,
			soybeans: 86,
			nuts: 414,
			fries: 122,
			potato: 101,
			oatmeal: 131,
			animal: 500,
			food: 300,
			plant: 250,
			bread: 400,
			cereal: 1000,
			fruit: 230,
		};
		var top_five_image_names = [];
		var top_five_image_carbon = 0;
		for (i = 0; i < 5; i++) {
			if (image_details[i]["name"].toLowerCase() in food_dict) {
				top_five_image_carbon =
					top_five_image_carbon + food_dict[image_details[i]["name"]];
				top_five_image_names.push(image_details[i]["name"]);
			} else {
				top_five_image_carbon = top_five_image_carbon + 15;
				top_five_image_names.push(image_details[i]["name"]);
			}
		}

		var returnJson = {
			Names: top_five_image_names,
			Carbon_footprint: top_five_image_carbon / 5,
		};
		res.json(returnJson);
	});
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
	await axios
		.get(url)
		.then(({ data }) => {
			driving_time = data.rows[0].elements[0].duration.text || null;
			origin_ad = data.origin_addresses[0];
			destination_ad = data.destination_addresses[0];
			distance = data.rows[0].elements[0].distance.text;
			distance_val = data.rows[0].elements[0].distance.value;
		})
		.catch((error) => console.log(error));

	url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin}&destinations=${destination}&mode=transit&transmit_mode=rail&key=${API_KEY}`;
	await axios
		.get(url)
		.then(({ data }) => {
			rail_time = data.rows[0].elements[0].duration.text;
		})
		.catch((error) => console.log(error));

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

router.get("/getNearestCity", async (req, res, next) => {
	const API_KEY = "AIzaSyA7ly7P0GNHtWO-wfAR5DWrsE8qDyb_OgA";

	const { city } = req.query;

	var nearest_airport, longitude, latitude;

	// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
	var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${API_KEY}`;

	await axios
		.get(url)
		.then(({ data }) => {
			// res.json(data);
			latitude = data.results[0].geometry.location.lat;
			longitude = data.results[0].geometry.location.lng;
		})
		.catch((error) => console.log(error));

	// https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.712784,-74.005941&rankby=distance&type=airport&key=AIzaSyA7ly7P0GNHtWO-wfAR5DWrsE8qDyb_OgA
	url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=50000&type=airport&key=${API_KEY}`;

	await axios
		.get(url)
		.then(({ data }) => {
			// res.json(data);
			nearest_airport_name = data.results[0].name;
			console.log(nearest_airport_name);
			// address_components[3].long_name;
		})
		.catch((error) => console.log(error));

	var search_query = nearest_airport_name + " code wikipedia";
	// airport_API_KEY = "c7d0ba4e31";
	var search_engine_ID = "9e88c5cc7164df494";
	
	// FIND iaat from name by searching csv file
	// TEST

	var airportObj = $.csv.toObjects(csv);

	for (var airport of airportObj){
		var isSame = nearest_airport_name.localeCompare(airport.name);
		if (isSame){
			airport_iaat = airport.iaat;
		}
	}



	// // https://www.googleapis.com/customsearch/v1?key=AIzaSyA7ly7P0GNHtWO-wfAR5DWrsE8qDyb_OgA&cx=9e88c5cc7164df494&q=John F. Kennedy International Airport code
	// url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${search_engine_ID}&q=${search_query}`;

	// await axios
	// 	.get(url)
	// 	.then(({ data }) => {
	// 		res.json(data);
	// 		airport_iaat = data.items[0].pagemap.hcard[0].nickname;
	// 		console.log(airport_iaat, "hi ");
	// 	})
	// 	.catch((error) => console.log(error));

	const return_val = {
		airport_iaat: airport_iaat,
	};

	res.json(return_val);
});

module.exports = router;
