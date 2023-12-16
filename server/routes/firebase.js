const router = require("express").Router();
const axios = require('axios'); 

router.get('/get-csv', async (req, res) => {
  try {
    // Get the URL from the query parameter or request body
    const csvFileUrl = req.query.csvFileUrl; // if the URL is in a query parameter
    // or
    // const csvFileUrl = req.body.csvFileUrl; // if the URL is in the request body

    if (!csvFileUrl) {
      res.status(400).send('CSV file URL is missing.');
      return;
    }
    console.log(csvFileUrl)
    // Make a GET request to the CSV file URL
    const response = await axios.get(csvFileUrl);
    console.log(response);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching the CSV file.');
  }
});


module.exports = router;
