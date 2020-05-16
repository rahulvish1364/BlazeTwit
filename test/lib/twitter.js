const expect = require('chai').expect
const sinon = require('sinon');
const axios = require('axios');
const Twitter = require('../../lib/twitter')

describe('the twitter module', () => {
   var twitter
    before(() => {
       twitter = new Twitter('key', 'secret')
   }); 
   it('should set a token', () => {
       twitter.setToken('abc', '123')
       expect(twitter.token).to.include({key: 'abc'})
       expect(twitter.token).to.include({secret: '123'})
   });
   it('should invoke Get API',async () => {
       sinon.stub(axios, 'get').resolves({data: 'foo'})
       let response = await twitter.get('/api')
       expect(response).to.equal('foo');
       axios.get.restore()
   });
   it('should invoke POST API ', async () => {
    sinon.stub(axios, 'post').resolves({data: 'bar'})
    let response = await twitter.post('/api')
    expect(response).to.equal('bar');
    axios.post.restore()
   });

});
