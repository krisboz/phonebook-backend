const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const url = `mongodb+srv://kbozinovic8:bDMRv8uNNui6cGvB@cluster0.2ycvwcp.mongodb.net/`;

console.log(`connecting to ${url}`);

mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    console.log("connected to MongoDb");
  })
  .catch((error) => {
    console.log("error connecting to Mongodb", error.message);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
