const express = require('express');
const router = express.Router();

// @route GET api/auth
// @desc Get Logged in user
// @acces Private

router.get('/' , (req,res)=>{
    res.send('GET logged in user')
});

// @route POST api/auth
// @desc Auth User an Get Token
// @acces Public

router.post('/' , (req,res)=>{
    res.send('Logg in user')
});

module.exports = router;