var axios = require("axios");
var express = require("express");
var router = express.Router();



router.get("/pay", async (req, res, next) => {

    const API_KEY = "fdb93d5ccb8a0249d01182fa760a5cc7";

    const merchantID = "SRCCHIPPAY";
    
    var url = `https://test-gateway.mastercard.com/api/rest/version/58/merchant/${merchantId}/session`;

    await axios.get(url).then(( info ) => {
        console.log(info);
    });
});