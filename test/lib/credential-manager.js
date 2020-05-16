    const chai = require('chai');
    const expect = chai.expect
    const sinon = require('sinon');
    const inquirer = require('inquirer');
    const CredentialManager = require('../../lib/credential-manager');
    const keytar = require('keytar');
    const chaiAsPromised = require('chai-as-promised')
    const fs = require('fs')
    const path = require('path')
chai.use(chaiAsPromised)

describe('a credential manager', () => {
    var creds
    before(()=>{
        creds = new CredentialManager('blaze-test')
    })

    it('should return credential when they are found', async () => {
        await creds.storeKeyAndSecret('apiKey','foo', 'bar')
        let [key, secret] = await creds.getKeyAndSecret('apiKey')
        expect(key).to.equal('foo');
        expect(secret).to.equals('bar')
    });
    it('should reject when no crednetials are found', async () => {
        await creds.clearKeyAndSecret('apiKey')
        expect(creds.getKeyAndSecret('apiKey')).to.be.rejected
    });
    after((done) => {
        fs.unlink(path.join(process.env.HOME, '.config', 'configstore', 'blaze-test.json'), done)
    });
})
