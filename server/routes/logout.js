const express = require('express');
const router = express.Router();
const config = require('../config');

router.get('/', (req, res) => {
    // delete the session
    req.session.destroy();
    res.redirect(`http://auth-server:${config.authServerPort}/logout`);
});

module.exports = router;
