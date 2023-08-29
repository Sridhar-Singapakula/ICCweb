const express=require("express");
const dotenv=require("dotenv");
const cors =require("cors");
const Connection=require("./db");
const clientRoutes=require("./routes/client")
const authRoutes=require("./routes/clientAuth")
const messageRoutes =require("./routes/messages")
const patientRoutes =require("./routes/patient")
const testRoutes = require("./routes/tests")
const packageRoutes =require("./routes/package")
const paymentRoutes = require("./routes/payment")
const QueryRoutes = require("./routes/queries")
const clientsTransactionsRoutes=require("./routes/clientsTransactions")
const directPatientRoutes = require("./routes/DirectPatient")
const blogRoutes=require("./routes/blog");
const GCpoints=require('./routes/GC');
const path=require("path");



dotenv.config();
Connection();

const app=express();

// app.use(cors({
//     credentials: true,
//     origin: "https://www.dhruvhealth.com"
//   }));
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
  }));

app.use(express.json());
app.use(express.static(path.join(__dirname,"build")));
//Routes
app.use("/api/clients",clientRoutes);
app.use("/api/login",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/client/patients",patientRoutes);
app.use("/api/tests",testRoutes);
app.use("/api/packages",packageRoutes);
app.use("/api/payments",paymentRoutes);
app.use("/api/queries",QueryRoutes)
app.use("/api/clientsTransactions",clientsTransactionsRoutes)
app.use("/api/directPatient",directPatientRoutes);
app.use("/api/blog",blogRoutes);
app.use("/api/GC",GCpoints);


app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"build","index.html"));
});


//listening
const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`Listening to ${port}..`);
})
