const router = require("express").Router();
const Joi = require("joi");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const { Package, validatePackage } = require('../models/packages');

// Create a new package
router.post('/', [auth, admin], async (req, res) => {
    try {
      const { error } = validatePackage(req.body);
      if (error) {
        return res.status(400).send({ message: error.details[0].message });
      }
  
      const { packageName, MRP, B2B, testsIncluded } = req.body;
  
      const package = new Package({
        packageName,
        MRP,
        B2B,
        testsIncluded,
      });
  
      await package.save();
  
      res.status(201).send({ data: package });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  });
  // Edit package by admin
router.put('/:id', [validateObjectId,admin], async (req, res) => {
    try {
      const { error } = validatePackage(req.body);
      if (error) {
        return res.status(400).send({ message: error.details[0].message });
      }
  
      const package = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!package) {
        return res.status(404).send({ message: 'Package not found' });
      }
  
      res.status(200).send({ data: package, message: 'Package updated successfully' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  });
  
  // Delete package by admin
  router.delete('/:id', [validateObjectId,admin], async (req, res) => {
    try {
      const package = await Package.findByIdAndRemove(req.params.id);
      if (!package) {
        return res.status(404).send({ message: 'Package not found' });
      }
  
      res.status(200).send({ data: package, message: 'Package deleted successfully' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  });
// Get all packages
router.get('/', async (req, res) => {
    try {
      const packages = await Package.find();
      res.status(200).send({ data: packages });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  });
  
  // Get specific package by ID
  router.get('/:id', [validateObjectId,auth], async (req, res) => {
    try {
      const package = await Package.findById(req.params.id);
      if (!package) {
        return res.status(404).send({ message: 'Package not found' });
      }
  
      res.status(200).send({ data: package });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  });


module.exports = router;