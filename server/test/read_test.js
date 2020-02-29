//inside read_test.js
const assert = require('assert');
const User = require('../models/User');
let user1;
beforeEach(done => {
  console.log('Creating a new user');
    user1 = new User({
      name : 'Satoshi Nakomoto',
      email : 'satnaks@mim.kwom',
      password : '121348t948723914791'
    });
    user1.save()
        .then(() => done())
        .catch(error => {
          console.log(error);
        });
});
describe('Reading user details', () => {
    it('finds user with the name of user', (done) => {
        User.findOne({ name: 'Satoshi Nakomoto'})
            .then((user1) => {
                assert(user1.name === 'Satoshi Nakomoto');
                done();
            })
            .catch(error => {
              console.log(error);
            });
    })
})
