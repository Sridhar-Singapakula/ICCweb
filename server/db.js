const mongoose = require("mongoose");


module.exports =async () => {
   const connectionParams={
       useNewUrlParser:true,
       useUnifiedTopology:true
}
  try {
      mongoose.connect('mongodb+srv://Admin:admin@cluster0.ezsj37r.mongodb.net/ICC?retryWrites=true&w=majority');
      console.log("db connected");
}
 catch (error) {
    console.log(error);
    console.log("Database not connected");
}
};