var express = require("express");
var unirest = require("unirest");
var router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
	res.send({ a: "b" });
});
/* GET Food carbon footprint score. */
router.get("/convertImage", function (req, res, next) {
	
	var req = unirest("POST", "https://microsoft-computer-vision3.p.rapidapi.com/tag");

	req.query({
		"language": "en"
	});

	req.headers({
		"x-rapidapi-host": "microsoft-computer-vision3.p.rapidapi.com",
		"x-rapidapi-key": "c6747c3e79msh7a29b84d7d64199p105efdjsnd26af7a67b01",
		"content-type": "application/json",
		"accept": "application/json",
		"useQueryString": true
	});

	req.type("json");
	req.send({
		"url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Sirloin_Steak_with_Fries.jpg/800px-Sirloin_Steak_with_Fries.jpg"
	});
	req.end(function (res) {
		if (res.error) throw new Error(res.error);
		
		var image_details_classes = res.body;
		var image_details = image_details_classes["tags"]
		
		var top_five_image_names = []
		for (i = 0; i < 5; i++) {
		  top_five_image_names.push(image_details[i]["name"]);
		}
		console.log(top_five_image_names);
	});


});

module.exports = router;



