const chai = require('chai');
const expect = chai.expect
const sinon = require('sinon');
const inquirer = require('inquirer');
const CredentialManager = require('../../lib/credential-manager');
const config = require('../../command/configure')
const fs = require('fs')
const path = require('path');
const configure = require('../../command/configure');

describe('the configure module', () => {
    var creds
    before(() => {
        creds = new CredentialManager('blaze-test')
    });

        it('should add credentials when none are found', async () => {
        sinon.stub(inquirer, 'prompt').resolves({key: 'one', secret: 'two'})
        await config.consumer('blaze-test')
        let [key, secret] = await creds.getKeyAndSecret('apiKey','consumer')
        expect(key).to.equal('one')
        expect(secret).to.equal('two')
        expect(inquirer.prompt.calledOnce).to.be.true
        inquirer.prompt.restore()
    })
    it('should overwrite existing credentials', async () => {
        sinon.stub(inquirer, 'prompt').resolves({key: 'three', secret: 'four'})
        await config.consumer('blaze-test')
        let [key, secret] = await creds.getKeyAndSecret('apiKey','consumer')
        expect(key).to.equal('three')
        expect(secret).to.equal('four')
        expect(inquirer.prompt.calledOnce).to.be.true
        inquirer.prompt.restore()
    });

    after((done) => {
        fs.unlink(path.join(process.env.HOME, '.config', 'configstore', 'blaze-test.json'), done)
    });
});
