const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');

require('../middlewares/passport');

router.post('/register', async (req, res) => {
    await auth.userRegister(req.body, res);
});

router.post('/login', async (req, res) => {
    await auth.userLogin(req.body, res);
})

module.exports = router;