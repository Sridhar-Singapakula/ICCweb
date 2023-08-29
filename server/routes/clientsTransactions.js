const router = require("express").Router();
const bcrypt = require("bcrypt");
const validObjectId = require("../middleware/validateObjectId");
const { validate, Client } = require("../models/client");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const {AmountDeposited} = require("../models/amountDeposited")



// Define the route
router.get('/', admin, async (req, res) => {
    try {
      // Fetch all amount deposited records
      const amountDeposited = await AmountDeposited.find().lean();
  
      // Fetch client names for each client ID
      const clientIds = amountDeposited.map(record => record.client);
      const clients = await Client.find({ _id: { $in: clientIds } }).lean();
  
      // Map the client names to the amount deposited records
      const result = amountDeposited.map(record => {
        const client = clients.find(c => c._id.toString() === record.client.toString());
        const clientName = client ? client.name : '';
        return { ...record, clientName };
      });
    
      res.status(200).send({data:result});
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });
  

  module.exports = router;
