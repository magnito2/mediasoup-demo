const assert = require('assert');
const User = require('../models/User'); //import user models

describe('Creating documents', () => {
  it('creates a user', done => {
    //assertion is not included in mocha so
    //require assert which was installed along with mocha
    const user1 = new User({
      name : 'Satoshi Nakomoto',
      email : 'satnaks@mim.kwom',
      password : '121348t948723914791'
    });
    user1.save() //takes some time and returns a Promise
    .then(() => {
      assert(!user1.isNew); //if user is saved to db it is not isNew
      done();
    });
  });
});
