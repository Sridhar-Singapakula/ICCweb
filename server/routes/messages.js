const router = require("express").Router();
const Joi = require("joi");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin")
const validateObjectId = require("../middleware/validateObjectId");
const { Message, validate} = require("../models/messages");
const {Client} =require("../models/client")

// Send message from admin to client
router.post('/:id',admin, async (req, res) => {
    try {
        const {error} = validate(req.body)
        if(error){
            return res.status(400).send({message:error.details[0].message});
        }
      // Find the client by id
      const client = await Client.findById(req.params.id)
  
      if (!client) {
        return res.status(404).send('Client not found');
      }
  
      // Create new message
      const message = await Message({...req.body,client:client._id}).save();
      
      client.messages.push(message._id);
      console.log(message)
      // Save the message
      await client.save();
  
      // Send response
      res.status(201).send(message);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  });

router.delete('/:clientId/messages/:messageId', admin, async (req, res) => {
    try {
      const clientId = req.params.clientId;
      const messageId = req.params.messageId;
  
      // Find the client by ID
      const client = await Client.findById(clientId);
  
      if (!client) {
        return res.status(404).send('Client not found');
      }
  
      // Find the message by ID
      const message = await Message.findById(messageId);
  
      if (!message) {
        return res.status(404).send('Message not found');
      }
  
      // Check if the message belongs to the client
      if (!client.messages.includes(messageId)) {
        return res.status(400).send('Message does not belong to the client');
      }
  
      // Remove the message from the client's messages array
      const index = client.messages.indexOf(messageId);
      client.messages.splice(index, 1);
  
      // Delete the message from the Messages collection
      await Message.findByIdAndDelete(messageId);
  
      // Save the updated client
      await client.save();
  
      res.status(200).send({message:'Message removed successfully'});
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  });
  

module.exports = router;