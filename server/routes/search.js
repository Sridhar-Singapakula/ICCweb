const router = require("express").Router();
const { Event } = require("../models/event"); // Add your Event model
const { Competition } = require("../models/GCparticipants"); // Add your GCParticipants model
const { GCFinalResults } = require("../models/GCFinalResults"); // Add your GCFinalResults model
const { GroupResult } = require("../models/GCGroupResults"); // Add your GroupResult model
const {GroupCompetition}=require("../models/GCgroupparticipants");
const { GCFinalResultsNoPart } = require("../models/GCfinalResultswithoutpart");
const {GCPerformance} = require("../models/GCperformanceranking");
const {GroupGCPerformance} =require("../models/GroupGCRank");


router.get("/",  async (req, res) => {
  try {
    const search = req.query.search;
    if (search) {
        const events = await Event.find({
            $or: [
              { GC: { $regex: search, $options: 'i' } },
              { Venue: { $regex: search, $options: 'i' } },
              { Date: { $regex: search, $options: 'i' } },
              { Secy: { $regex: search, $options: 'i' } },
            ],
          }).limit(10);
    const gcParticipants = await Competition.find({
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { "participants.name": { $regex: search, $options: 'i' } },
          { "participants.rollNo": { $regex: search, $options: 'i' } },
          { "participants.hostelNo": { $regex: search, $options: 'i' } },
        ],
      }).limit(10);
      const gcFinalResults = await GCFinalResults.find({
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { "participants.name": { $regex: search, $options: 'i' } },
          { "participants.rollNo": { $regex: search, $options: 'i' } },
          { "participants.hostelNo": { $regex: search, $options: 'i' } },
        ],
      }).limit(10);
      const gcFinalResultsNoPart = await GCFinalResultsNoPart.find({
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { "participants.Points": { $regex: search, $options: 'i' } },
          { "participants.hostelNo": { $regex: search, $options: 'i' } },
        ],
      }).limit(10);
      const gcPerformance = await GCPerformance.find({
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { "participants.name": { $regex: search, $options: 'i' } },
          { "participants.hostelNo": { $regex: search, $options: 'i' } },
        ],
      }).limit(10);
      const gcGroupRank = await GroupGCPerformance.find({
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { "participants.hostelNo": { $regex: search, $options: 'i' } },
        ],
      }).limit(10);
      const gcGroupFinalResults = await GroupResult.find({
        name: { $regex: search, $options: "i" },
      }).limit(10);
      const gcGroupParticipants = await GroupCompetition.find({
        name: { $regex: search, $options: "i" },
      }).limit(10);
      const allData = [].concat(events, gcParticipants, gcFinalResults, gcGroupFinalResults, gcGroupParticipants,gcFinalResultsNoPart,gcPerformance,gcGroupRank);
      console.log(allData);
      res.status(200).send(allData);
    } else {
      const events = await Event.find();
      const gcParticipants = await Competition.find();
      const gcFinalResults = await GCFinalResults.find();
      const gcGroupFinalResults = await GroupResult.find();
      const gcGroupParticipants = await GroupCompetition.find();
      const gCFinaLResultsNoPart= await GCFinalResultsNoPart.find();
      const gcPerformance=await GCPerformance.find();
      const gcGroupRank=await GroupGCPerformance.find();
      // Combine all the documents into a single array
      const allData = [].concat(events, gcParticipants, gcFinalResults, gcGroupFinalResults, gcGroupParticipants, gCFinaLResultsNoPart,gcPerformance,gcGroupRank);
      res.status(200).send(allData);
    }
  } catch (error) {
    res.status(500).send({ error});
  }
});

module.exports = router;
