const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../config');

router.get('/', (req, res) => {
    // token in session -> get user data and send it back to the react app

    console.log("access_token: " + req.session.access_token)
    console.log("id_token: " + req.session.id_token)

    if (req.session.access_token) {
        request(
            // POST request to /introspect endpoint
            {
                method: 'POST',
                uri: `http://auth-server:${config.authServerPort}/oauth2/introspect`,
                form: {
                    'client_id': config.clientID,
                    'client_secret': config.clientSecret,
                    'token': req.session.access_token
                }
            },

            // callback
            (error, response, body) => {
                console.log("!!! introspect completed")
                let introspectResponse = JSON.parse(body);

                console.log("response: \n" + body)

                // valid token -> get more user data and send it back to the react app
                if (introspectResponse.active) {

                    // res.send(
                    //             {
                    //                 token: {
                    //                     ...introspectResponse,
                    //                 }
                    //             }
                    //         );

                    request(
                        // GET request to /registration endpoint
                        {
                            method: 'GET',
                            uri: `http://localhost:${config.authServerPort}/userinfo`,
                            json: true,
                            headers: {
                                'Authorization': 'Bearer' + req.session.access_token
                            }
                        },

                        // callback
                        (error, response, body) => {
                            console.log("/userinfo: " + response)
                            res.send(
                                {
                                    token: {
                                        ...introspectResponse,
                                    },
                                    ...body
                                }
                            );
                        }
                    );
                }

                // expired token -> send nothing
                else {
                    req.session.destroy();
                    res.send({});
                }
            }
        );
    }

    // no token -> send nothing
    else {
        res.send({});
    }
});

module.exports = router;
