const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.get('/', async (req,res)=>{
  res.json(await Contact.find().sort({createdAt:-1}));
});
router.post('/', async (req,res)=>{
  const {fullName,email,mobile,city} = req.body;
  const c = new Contact({fullName,email,mobile,city});
  await c.save();
  res.status(201).json(c);
});
module.exports = router;
