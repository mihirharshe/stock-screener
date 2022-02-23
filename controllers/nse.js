const { NseIndia }  = require("stock-nse-india");
const nseIndia = new NseIndia()


const getMarketStatus = async (_req, res) => {
    try {
        const status = await nseIndia.getDataByEndpoint('/api/marketStatus');
        return res.status(200).json(status);
    } catch(err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: err
        })
    }
}

const getEquityDetails = async (req, res) => {
    try {
        const { symbol } = req.params;
        const details = await nseIndia.getEquityDetails(symbol);
        if (details.msg) { // ==> msg is in details when no symbol is found
            return res.status(404).json({
                success: false,
                error: 'Symbol not found'
            })
        }
        return res.status(200).json(details);
    } catch(err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: err
        })
    }
}

const getGainers = async (req, res) => {
    try {
        const { indexSymbol } = req.params
        const indexData = await nseIndia.getEquityStockIndices(indexSymbol)
        const gainers = [];
        indexData.data.forEach((equityDetails) => {
            if (equityDetails.pChange > 0 && equityDetails.priority!==1)
                gainers.push(equityDetails)
        })
        gainers.sort((a,b) => b.pChange - a.pChange);
        return res.status(200).json({
            gainers
        })
    } catch(err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            error: err.name +": "+ err.message
        })
    }
}

const getLosers = async (req, res) => {
    try {
        const { indexSymbol } = req.params
        const indexData = await nseIndia.getEquityStockIndices(indexSymbol)
        const losers = [];
        indexData.data.forEach((equityDetails) => {
            if (equityDetails.pChange < 0 && equityDetails.priority!==1)
                losers.push(equityDetails)
        })
        losers.sort((a,b) => a.pChange - b.pChange);
        return res.status(200).json({
            losers
        })
    } catch(err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            error: err.name +": "+ err.message
        })
    }
}


module.exports = {
    getMarketStatus,
    getEquityDetails,
    getGainers,
    getLosers
}