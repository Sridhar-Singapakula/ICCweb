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
const path=require("path");


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


app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"build","index.html"));
});


//listening
const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`Listening to ${port}..`);
})