const assert = require('assert');
const User = require('../models/User');

describe('Deleting a user', () => {
  let user1;

  beforeEach(done => {
    user1 = new User({
      name : 'Satoshi Nakomoto',
      email : 'satnaks@mim.kwom',
      password : '121348t948723914791'
    });
    user1.save()
    .then(() => done());
  });

  it('removes a user using its instance', done => {
    user1.remove()
    .then(() => User.findOne({name : 'Satoshi Nakomoto'}))
    .then(user2 => {
      assert(user2 === null);
      done();
    });
  });

  it('removes multiple users', done => {
    
  })
})
