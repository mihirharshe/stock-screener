const express = require('express');
const router = express.Router();
const { getStocks, addStocks, deleteStocks } = require('../controllers/stocks')

router.get('/stock', async (req, res) => {
    await getStocks(req, res);
})

router.post('/stock', async (req, res) => {
    await addStocks(req, res);
})

router.put('/stock/:symbol', async (req, res) => {
    await deleteStocks(req, res);
})


module.exports = router;