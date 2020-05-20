const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon');
const axios = require('axios');
const chaiAsPromised = require('chai-as-promised')
const Twitter = require('../../lib/twitter')

chai.use(chaiAsPromised)

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
   it('should reject on Invalid credentials ', async () => {
       sinon.stub(axios, 'post').rejects(new Error('401'))
       await expect(twitter.post('/api', 'stuff')).to.be.rejectedWith('Invalid Twitter credentials')
       axios.post.restore()
       sinon.stub(axios, 'get').rejects(new Error('401'))
       await expect(twitter.get('/api', 'stuff')).to.be.rejectedWith('Invalid Twitter credentials')
       axios.get.restore()
   });
   it('should reject on rate Limit error', async  () => {
        sinon.stub(axios, 'post').rejects(new Error('429'))
        await expect(twitter.post('/api', 'stuff')).to.be.rejectedWith('Twitter rate limit reached')
        axios.post.restore()
        sinon.stub(axios, 'get').rejects(new Error('429'))
        await expect(twitter.get('/api', 'stuff')).to.be.rejectedWith('Twitter rate limit reached')
        axios.get.restore()
    });
    it('should reject on rate Limit error', async () => {
        sinon.stub(axios, 'post').rejects(new Error('foo'))
        await expect(twitter.post('/api', 'stuff')).to.be.rejectedWith('Twitter')
        axios.post.restore()
        sinon.stub(axios, 'get').rejects(new Error('fasssas'))
        await expect(twitter.get('/api', 'stuff')).to.be.rejectedWith('Twitter')
        axios.get.restore()
    });


});
