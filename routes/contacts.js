const express = require('express');
const router = express.Router();

// @route GET api/contacts
// @desc get all users contacts
// @acces Private

router.get('/' , (req,res)=>{
    res.send('get all contacts')
});

// @route POST api/contacts
// @desc add new contact
// @acces Private

router.post('/' , (req,res)=>{
    res.send('Add contact')
});

// @route PUT api/contacts/:id
// @desc update  contact
// @acces Private

router.put('/:id' , (req,res)=>{
    res.send('update contact ')
});

// @route DELETE api/contacts/:id
// @desc delete contact
// @acces Private

router.delete('/:id' , (req,res)=>{
    res.send('delete conctact')
});

module.exports = router;