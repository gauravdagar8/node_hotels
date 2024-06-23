const express = require('express');
const router = express.Router();
const Person = require('./../models/person.js');

// POST route to add a person
router.post('/', async(req, res) => {
    try{
      const data = req.body // Assuming the request body contains the person data
      // Create a New Person document using the Mongoose model
      const newPerson = new Person(data);
      // Save the new Person to the database
      const respone = await newPerson.save();
      console.log('data saved');
      res.status(200).json(respone);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal server '});
    }
  
  })



  router.put('/:id', async (req, res) => {
    try{
      const personId = req.params.id;
      const updatePersonData = req.body;

      const respone = await Person.findByIdAndUpdate(personId, updatePersonData, {
        new : true, // Return the updated document
        runValidators : true, // run Mongoose validation
      })
      if(!respone) {
        return res.status(404).json({error: 'Person not found'});
      }

      console.log('data updated');
      res.status(200).json(respone);
    }catch(err){
      console.log(err);
      res.status(500).json({err: 'Internal Server Error'});
    }
  })

router.delete('/person/:gaurav', async (res, req) =>{
  try {
    const personId = req.params.gaurav;
    // Assuming you have a Person model
    const respone = await Person.findByIdAndRemove(personId);
    if(!respone) {
      return res.status(404).json({error: 'Person not found'});
    }
    console.log('data delete');
    res.status(200).json({message: 'Person Deleted successfully'});

  }catch(err) {
    console.log(err);
    res.status(500).json({err: 'Invalid Server error'});
  }
})





  
// GET method to get the person

router.get('/', async (req,res) =>{
    try{
      const data = await Person.find();
      console.log('data fetched');
      res.status(200).json(data);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal server '});
    }
  })


  // workType 

  router.get('/:workType', async (req, res) => {
    // const filePath = path.resolve(__dirname,'index.html')
        try{
          const workType = req.params.workType; //Extract the work type from the URL parameter
          if(workType == 'chef'|| workType == 'waiter' || workType == 'manager'){
            // using find() method to retrive data form db ==
            const respone = await Person.find({work: workType});
            console.log('data fetched');
            res.status(200).json(respone);
            respone.write(JSON.stringify({data : respone}));
            // res.sendFile(filePath);
            
          }
          else{
            res.status(404).json({error: 'Invalid work type'});
          }
        }catch(err){
          console.log(err);
          res.status(500).json({error: 'Internal Server Error'});
        }   
  })





  module.exports = router;