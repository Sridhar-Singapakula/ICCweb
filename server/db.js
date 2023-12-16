const mongoose = require("mongoose");
mongoose.set("strictQuery",true);

module.exports =async () => {
   const connectionParams={
       useNewUrlParser:true,
       useUnifiedTopology:true
}
  try {
      mongoose.connect('mongodb://localhost:27017/ICCweb',()=>{
   console.log("Database connected")});
}
 catch (error) {
    console.log(error);
    console.log("Database not connected");
}
};