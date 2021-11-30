const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

// const connectDB = ()=> {
//   mongoose
//   .connect(db)
//   .then(x => {
//     console.log(
//       `Connected to Mongo! Database name: "${x.connections[0].name}"`
//     );
//   })
//   .catch(err => {
//     console.error("Error connecting to mongo", err);
//   });
// }

const connectDB =async ()=>{
  try {
    await mongoose.connect(db,()=>{
      console.log(`MongoDB connected to Database ${mongoose.connections[0].name}`)
    })
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

module.exports = connectDB