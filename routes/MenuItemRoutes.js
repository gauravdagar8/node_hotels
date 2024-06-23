const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem.js');

// POST route to add a Menu Item
router.post('/', async(req, res) => {
    try{
      const data = req.body // Assuming the request body contains the person data
      // Create a New Menuitem document using the Mongoose model
      const newMenu = new MenuItem(data);
      const respone = await newMenu.save();
      console.log('data saved');
      res.status(200).json(respone);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal server '});
    }
  })

   // GET method to get the Menu Items
   router.get('/',async(req, res) => {
    try{
      const data = await MenuItem.find();
      console.log('data fetched');
      res.status(200).json(data);
    }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
    }
  })

  router.get('/:taste', async (req, res) =>{
    try{
        const tasteType = req.params.taste;
        if(tasteType == 'spicy',tasteType == 'sweet' , tasteType == 'sour') {
            //using find() method to retrive data from db ==
            const respone =  await MenuItem.find({taste: tasteType});
            console.log('data fetched menu');
            res.status(200).json(respone);
            respone.write(JSON.stringify({data : respone}));
        }else {
            res.status(404).json({error: 'Invalid work type'});
        }
    }catch(err) {
        console.log(err);
        res.status(500).json({error: 'Invalid server error'});
    }
  })

  
  module.exports = router;