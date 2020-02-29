const mongoose = require("mongoose");
const config = require("../config");

//tell mongoose to use es6 implementation of Promise
mongoose.Promise = global.Promise;

console.log("Connecting to ", config.database.mongodb_uri);
mongoose.connect(config.database.mongodb_uri);

mongoose.connection
  .once("open", () => console.log("connected"))
  .on("error", error => console.warn("Error : ", error));

//Called hooks which run before something
afterEach(done => {
  console.log("Clearing the users table");
  mongoose.connection.collections.users.drop(() => {
    //do something after the drop is completed
    done(); //go ahead everything is done now
  });
});
