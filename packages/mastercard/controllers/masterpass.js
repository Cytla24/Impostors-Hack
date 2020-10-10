
var express = require('express');
var gatewayService = require('../service/gatewayService');
var router = express.Router();
var utils = require('../scripts/util/commonUtils');
var view_path = '../templates';
/**
* Create session and fetch Masterpass configuration details
* 1. Create session
* 2. Use OPEN_WALLET to get merchant's Masterpass configuration
* 3. Pass these values to client for use with Masterpass Javascript library
* @return response for masterpassButton.ejs
*/
router.post('/processMasterpass', function (request, response, next) {
    gatewayService.getMasterpassSession({}, function (sessresult) {
        if (sessresult.message.result) {
            if (sessresult.message.result == "SUCCESS") {
                var sessionid = sessresult.message.session.id;
                var requestData = {
                    "order": {
                        "amount": request.body.orderAmount,
                        "currency": request.body.orderCurrency
                    }
                }
                request.session.ssid = sessionid;
                gatewayService.updateMasterpassSession(sessionid, requestData, function (updsessionresult) {
                    request.session.save();
                    var orderAmount = request.body.orderAmount;
                    var orderCurrency = request.body.orderCurrency;
                    var orderId = request.body.orderId;
                    var masterpassOriginUrl = request.body.masterpassOriginUrl;
                    var walletProvider = request.body.walletProvider;
                    var requestPut = {
                        "order": {
                            "amount": orderAmount,
                            "currency": orderCurrency,
                            "walletProvider": walletProvider
                        },
                        "wallet": {
                            "masterpass": {
                                "originUrl": masterpassOriginUrl
                            }
                        }
                    };
                    gatewayService.walletRequest(sessionid, requestPut, function (finalresult) {
                        if (finalresult.result) {
                            response.render(view_path + '/error', finalresult.error);
                        } else {
                            var allowedCardTypes = finalresult.wallet.masterpass.allowedCardTypes;
                            var merchantCheckoutId = finalresult.wallet.masterpass.merchantCheckoutId;
                            var requestToken = finalresult.wallet.masterpass.requestToken;
                            var masterpassResponse = {
                                allowedCardTypes: allowedCardTypes,
                                merchantCheckoutId: merchantCheckoutId,
                                requestToken: requestToken
                            };
                            response.render(view_path + '/masterpassButton', masterpassResponse);
                        }
                        next();
                    });
                });
            } else {
                var errorData = {
                    cause: sessresult.message.error.cause,
                    explanation: sessresult.message.error.explanation,
                    field: "apiOperation",
                    validationType: "INVALID"
                }
                response.render(view_path + '/error', errorData);
            }
        } else {
            var errorData = {
                cause: sessresult.message.error.cause,
                explanation: sessresult.message.error.explanation,
                field: "apiOperation",
                validationType: "INVALID"
            }
            response.render(view_path + '/error', errorData);
        }
    });
});


/**
* Handles the response from Masterpass. Retrieves the parameters and uses them to complete a payment or authorization.
* @param oauthToken
* @param oauthVerifier identifies the transaction. Used to retrieve payment details from Masterpass server
* @param checkoutId unique 32-character alphanumeric identifier generated by Masterpass, which identifies your settings during a checkout
* @param checkoutResourceUrl
* @param mpstatus returns status of the consumer's interaction with the Masterpass UI
* @return response for masterpassReceipt.ejs
*/
router.get('/masterpassResponse', function (request, response, next) {
    var oauthToken = request.query.oauth_token;
    var oauthVerifier = request.query.oauth_verifier;
    var checkoutId = request.query.checkoutId;
    var checkoutUrl = request.query.checkout_resource_url;
    var payload = {
        "apiOperation": "UPDATE_SESSION_FROM_WALLET",
        "order": {
            "walletProvider": "MASTERPASS_ONLINE"
        },
        "wallet": {
            "masterpass": {
                "oauthToken": oauthToken,
                "oauthVerifier": oauthVerifier,
                "checkoutUrl": checkoutUrl
            }
        }
    };
    var sessionId = request.session.ssid;
    gatewayService.masterpassResponse(sessionId, payload, function (finalresult) {
        var data = JSON.stringify(finalresult);
        if (finalresult.order) {
            var orderId = utils.keyGen(10);
            var transactionId = utils.keyGen(10);
            var requestbody = {
                "apiOperation": "PAY",
                "order": {
                    "amount": finalresult.order.amount,
                    "currency": finalresult.order.currency
                },
                "session": {
                    "id": finalresult.session.id
                }
            };
            gatewayService.masterpassFinalResponse(orderId, transactionId, requestbody, function (result) {
                var order = result.order.id;
                var amount = result.order.amount;
                var currency = result.order.currency;
                var msResponse = {
                    error: false,
                    title: "Masterpass Payment Receipt",
                    cause: "Payment complete!",
                    message: "Your payment was APPROVED",
                    orderId: order,
                    orderAmount: amount,
                    orderCurrency: currency
                };
                response.render(view_path + '/masterpassReceipt', msResponse);
            });
        } else {
            response.render(view_path + '/error', { error: "error" });
        }
    });
});

module.exports = router;
