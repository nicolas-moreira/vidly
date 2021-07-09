const mongoose = require('mongoose');
const {Customer, validate} = require('../models/customer')
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const customers  = await Customer.find();
    res.send(customers);
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

     const customers = new Customer({

        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });

    await customers.save();
    res.send(customers);
});

router.put('/:id', async (req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customers = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name}, {
        new: true
    });

    if(!customers) return res.status(404).send('The customer with the given id was not found');

    console.log(`The customer with the given id: ${req.params.id} has been updated`);

    res.send(customers);
});

router.delete('/:id', async (req,res) => {
    const customers = await Customer.findByIdAndRemove(req.params.id);

    if(!customers) return res.status(404).send('The customer with the given id was not found');
    
    console.log(`The customer with the id: ${req.params.id} has been deleted`);

    res.send(customers);
});

router.get('/:id', async (req, res) => {
    // get customer by Id
        const customers = await Customer.findById(req.params.id);
        
        if(!customers) return res.status(404).send('The customer with the given id was not found');

        res.send(customers);
});

module.exports = router;