const express=require("express");
const dotenv=require("dotenv");
const cors =require("cors");
const Connection=require("./db");
const clientRoutes=require("./routes/client")
const authRoutes=require("./routes/clientAuth")
const messageRoutes =require("./routes/messages")


const QueryRoutes = require("./routes/queries")
const blogRoutes=require("./routes/blog");
const GCpoints=require('./routes/GC');
const eventRoutes = require("./routes/event")
const GCparticipantsRoutes = require("./routes/GCparticipants");
const GCgroupparticipants = require("./routes/GCgroupparticipants");
const GCFinalResults=require("./routes/GCFinalResults");
const GroupResult = require("./routes/GCGroupResult");
const searchRoute = require("./routes/search");
const firebase = require("./routes/firebase");
const FromCsvFile =require("./routes/fromcsvfile");
const GCFinalResultsNoPartRoutes=require("./routes/GCFinalResultsNoPartRoutes");
const GCPerformance = require("./routes/GCperformance");
const GroupGcNameRankRoutes=require("./routes/GroupGCNameRank");
const GroupGcRank = require("./routes/GroupGcRankRoutes");


const path=require("path");
const multer = require("multer"); 


dotenv.config();
Connection();

const app=express();

// app.use(cors({
//         credentials:true,
//         origin:"http://10.198.49.190"
//         }));
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
  }));
  
// Configure multer to store uploaded files in a specific directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads"); // Create a directory named "uploads" in your project
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, Date.now() + ext); // Rename the file with a unique timestamp
    },
  });
  
  const upload = multer({ storage: storage });
  
  // Serve uploaded images from the "uploads" directory
  app.use(express.static("uploads"));
  
  // Define an endpoint for handling file uploads
  app.post("/culturals/api/upload", upload.single("file"), (req, res) => {
    console.log("hello")
    if (req.file) {
      // File was uploaded successfully
      const imageUrl = `${req.protocol}://${req.get("host")}/${req.file.filename}`;
      res.json({ success: true, imageUrl });
    } else {
      // File upload failed
      res.json({ success: false, error: "File upload failed." });
    }
  });

app.use(express.json());
app.use(express.static(path.join(__dirname,"build")));
//Routes
app.use("/culturals/api/clients",clientRoutes);
app.use("/culturals/api/login",authRoutes);
app.use("/culturals/api/messages",messageRoutes);
app.use("/culturals/api/queries",QueryRoutes)
app.use("/culturals/api/blog",blogRoutes);
app.use("/culturals/api/GC",GCpoints);
app.use("/culturals/api/event",eventRoutes);
app.use("/culturals/api/GCparticipants",GCparticipantsRoutes);
app.use("/culturals/api/GCgroupparticipants",GCgroupparticipants);
app.use("/culturals/api/GCFinalResults",GCFinalResults);
app.use("/culturals/api/GroupResult",GroupResult);
app.use("/culturals/api/search",searchRoute );
app.use("/culturals/api/firebase",firebase);
app.use("/culturals/api/csv",FromCsvFile);
app.use("/culturals/api/GCFinalResultsNoPartRoutes",GCFinalResultsNoPartRoutes);
app.use("/culturals/api/GCPerformance",GCPerformance);
app.use("/culturals/api/GroupGCNameRanking",GroupGcNameRankRoutes);
app.use("/culturals/api/GroupGCRank",GroupGcRank);


app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"build","index.html"));
});


//listening
const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`Listening to ${port}..`);
})