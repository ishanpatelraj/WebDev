const express = require('express');
const router = express.Router();
const Person = require('../models/Person');
const { model } = require('mongoose');

// Create a new person
router.get('/:workType', async (req, res) => {
    try{
        const workType = req.params.workType;
        if(workType == 'chef' || workType == 'developer' || workType == 'teacher' || workType == 'artist' || workType == 'other'){
            const response = await Person.find({ work: workType });
            console.log('Response Fetched Successfullly');
            res.status(200).json(response);
        }
        else{
            console.log('Invalid work type');
            res.status(400).json({error : 'Invalid work type'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : 'Data Not Found'});
    }
});

router.get('/', async (req, res) => {
    try{
        const data = await Person.find();
        console.log('Data Fetched Successfully');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Data Not Found'});
    }
});

router.post("/", async (req, res) => {
    try{
        const data = req.body;

        const newPerson = new Person(data);

        const response = await newPerson.save();
        console.log('Data saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.put("/:id", async (req, res) => {
    try{
        const personId = req.params.id;
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,
            runValidators: true
        })

        if(!response){
            console.log('Person not found');
            return res.status(404).json({error: 'Person not found'});
        }

        console.log('Data Updated Successfully');
        res.status(200).json(response);

    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.delete("/:id", async (req, res) => {
    try{
        const personId = req.params.id;
        // updatedPersonData = 
        const response = await Person.findByIdAndDelete(personId);

        if(!response){
            console.log('Data not found');
            res.status(404).json({error : 'Data not found'})
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal Server Error'});
    }
});

module.exports = router;

