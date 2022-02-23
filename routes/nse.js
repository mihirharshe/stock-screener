const express = require('express');
const router = express.Router();
const passport = require('passport');
const { getEquityDetails, getMarketStatus, getGainers, getLosers } = require('../controllers/nse');

const userAuth = passport.authenticate('jwt', { session: false })

router.use(userAuth);

router.get('/status', async (req, res) => {
    await getMarketStatus(req, res);
})

router.get('/equity/:symbol', async(req, res) => {
    await getEquityDetails(req, res);
})

router.get('/gainers/:indexSymbol', async (req, res) => {
    await getGainers(req, res);
})

router.get('/losers/:indexSymbol', async (req, res) => {
    await getLosers(req, res);
})

module.exports = router;
