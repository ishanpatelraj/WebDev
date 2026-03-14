const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const { model } = require('mongoose');

router.post("/", async (req, res) => {
    try{
        const data = req.body;

        const newMenuItem = new MenuItem(data);
        const response = await newMenuItem.save();
        console.log('Men Item Saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal Server Error'});
    }
})

router.get('/', async (req, res) => {
    try{
        const data = await MenuItem.find();
        console.log('Data Fetched Successfully');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal Server Error'});
    }
});

module.exports = router;