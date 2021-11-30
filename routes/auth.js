const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../midleware/auth')
const { check, validationResult } = require('express-validator');

const User = require('../models/User')

// @route GET api/auth
// @desc Get Logged in user
// @acces Private

router.get('/' ,auth, async (req,res)=>{
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.send(user);

        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route POST api/auth
// @desc Auth User an Get Token
// @acces Public

router.post('/',[
    check('email','Please enter a valid email').isEmail(),
    check('password','Please password is required').exists()
],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {email,password}=req.body;

    try {
        let user = await User.findOne({email});

        if(!user){
            return res.status(400).json({msg:'Invalid credentials'})
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({msg:"Invalid Credentials"})
        }

        const payload = {
            user:{
                id:user.id
            }
        }

        jwt.sign(payload,config.get('jwtSecret'),{expiresIn:36000},(err,token)=>{
            if(err)throw error;
            res.json({token})
        })
    } catch (error) {
        console.error(err.message);
        res.status(500).json('Server Error')
    }
});


module.exports = router;