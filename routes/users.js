const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');


const User = require('../models/User')

// @route POST api/users
// @desc Register a user
// @acces Public

router.post('/',[
    check('name','Please add a name').not().isEmpty(),
    check('email','Please enter a valied email').isEmail(),
    check('password','Please enter a valid password').isLength({min:6})
],
async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const{name,email,password} = req.body;

    try {
        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({msg:'User already exist'})
        }

        user=new User({
            name,
            password,
            email
        })
        

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt)

        await user.save();

        const payload = {
            user:{
                id:user.id
            }
        }

        jwt.sign(payload,config.get('jwtSecret'),{expiresIn:360000},(err,token)=>{
            if(err)throw error;
            res.json({token})
        })

        
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
})



module.exports = router;