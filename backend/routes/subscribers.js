const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');

router.get('/', async (req,res)=>{
  res.json(await Subscriber.find().sort({createdAt:-1}));
});
router.post('/', async (req,res)=>{
  const {email} = req.body;
  const exists = await Subscriber.findOne({email});
  if(exists) return res.status(400).json({message:'Already subscribed'});
  const s = new Subscriber({email});
  await s.save();
  res.status(201).json(s);
});
module.exports = router;
