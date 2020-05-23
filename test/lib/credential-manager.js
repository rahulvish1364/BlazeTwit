const chai = require('chai');
const expect = chai.expect
const CredentialManager = require('../../lib/credential-manager');
const chaiAsPromised = require('chai-as-promised')
const fs = require('fs-extra')
const path = require('path')
chai.use(chaiAsPromised)

describe('a credential manager', () => {
    var creds
    before(()=>{
        creds = new CredentialManager('blaze-test')
    })
    it('should return the credentials saved in the environment', async () => {
        process.env['BLAZE-TEST_COMSUER_KEY'] = 'one'
        process.env['BLAZE-TEST_COMSUER_SECRET'] = 'two'
        let [key, secret] = await creds.getKeyAndSecret('consumer')
        expect(key).to.equal('one');
        expect(secret).to.equal('two');
    });
    it('should prefer crednetials saved in the environment', async () => {
        await creds.storeKeyAndSecret('consumer', 'foo', 'bar')
        let [key, secret] = await creds.getKeyAndSecret('consumer')
        expect(key).to.equal('one')
        expect(secret).to.equal('two');
    });
    it('should return credential when they are found', async () => {
        await creds.storeKeyAndSecret('apiKey','foo', 'bar')
        let [key, secret] = await creds.getKeyAndSecret('apiKey')
        expect(key).to.equal('foo');
        expect(secret).to.equals('bar')
    });
    it('should reject when no keys are found', async () => {
        await creds.clearKeyAndSecret('apiKey')
        expect(creds.getKeyAndSecret('apiKey')).to.be.rejectedWith('Missing comsumer key')
    });
    it('should reject when no secret  is found ',async () => {
        creds.conf.set('key.consumer', 'foo')
        await expect(creds.getKeyAndSecret('consumer')).to.be.rejectedWith('Missing consumer key')
        creds.conf.delete('key.consumer')
    });
    it('should remove all credentials ', async () => {
        await creds.storeKeyAndSecret('consumer', 'one', 'two')
        await creds.storeKeyAndSecret('acount', 'three', 'four')
        await creds.clearAll()
        expect(creds.getKeyAndSecret('consumer')).to.be.rejectedWith()
        expect(creds.getKeyAndSecret('account')).to.be.rejectedWith()
    });
    after(async () => {
        await creds.clearAll()
        await fs.unlink(path.join(process.env.HOME, '.config', 'configstore', 'blaze-test.json'))
    });
})
