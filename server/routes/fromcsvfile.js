const router = require("express").Router();
const { Competition } = require("../models/GCparticipants");
const Papa = require("papaparse");
const axios = require("axios");

// Create a new route to add multiple participants from a CSV file
router.post("/:id/add-participants-from-csv", async (req, res) => {
  try {
    const { id } = req.params;
    const csvFileUrl = req.query.csvFileUrl;
    console.log(csvFileUrl);

    if (!csvFileUrl) {
      return res.status(400).send({ message: "CSV file URL is required" });
    }

    const competition = await Competition.findById(id);

    if (!competition) {
      return res.status(404).send({ message: "Competition not found" });
    }

    try {
        console.log(csvFileUrl)
      const response = await axios.get(csvFileUrl);
      console.log(response)

      if (response.status !== 200) {
        return res.status(500).send({ message: "Failed to fetch the CSV file" });
      }

      const csvData = response.data;

      // Use papaparse to parse the CSV data
      Papa.parse(csvData, {
        complete: (result) => {
          const columnHeaders = result.data[0];

          // Ensure the CSV contains the expected columns (name, rollNo, hostelNo)
          const requiredColumns = ["name", "rollNo", "hostelNo"];
          for (const column of requiredColumns) {
            if (!columnHeaders.includes(column)) {
              return res
                .status(400)
                .send({ message: `CSV file must contain a column for ${column}` });
            }
          }

          // Map the data from the CSV file to participants and add them to the competition
          const participants = result.data.slice(1).map((row) => ({
            name: row[columnHeaders.indexOf("name")],
            rollNo: row[columnHeaders.indexOf("rollNo")],
            hostelNo: row[columnHeaders.indexOf("hostelNo")],
          }));

          competition.participants.push(...participants);

          // Save the updated competition with the new participants
          competition.save();

          res
            .status(200)
            .send({ message: "Participants added to the competition successfully" });
        },
      });
    } catch (error) {
      
      return res.status(500).send({ message: "Error downloading or parsing CSV file" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
});

module.exports = router;
