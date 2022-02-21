const express = require('express');
const router = express.Router();
const auth = require('../controllers/register');
const passport = require('passport')

// router.use(passport.initialize())

require('../middlewares/passport');

const userAuth = passport.authenticate("jwt", { session: false });

// router.get('/register', (req, res) => {
//     res.send("Register")
// })

// router.get('/login', (req, res) => {
//     res.send('Login')
// })

// router.get('/watchlist', userAuth, async (req, res) => {
//     res.send('Protected route')
// })

router.post('/register', async (req, res) => {
    await auth.userRegister(req.body, res);
});

router.post('/login', async (req, res) => {
    await auth.userLogin(req.body, res);
})

router.get('/user', async (req, res) => {
    await auth.userCheck(req, res);
});

router.get('/stock', async (req, res) => {
    await auth.getStocks(req, res);
})

router.post('/stock', async (req, res) => {
    await auth.addStocks(req, res);
})

router.put('/stock/:symbol', async (req, res) => {
    await auth.deleteStocks(req, res);
})


module.exports = router;