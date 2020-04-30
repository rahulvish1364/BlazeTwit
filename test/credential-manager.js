const chai = require('chai');
const expect = chai.expect
const sinon = require('sinon');
const inquirer = require('inquirer');
const CredentialManager = require('../lib/credential-manager');
const keytar = require('keytar');
describe('a credential manager', () => {
    var creds;
    before(()=>{
        creds = new CredentialManager('twine-test')
    })

    context('with no existing credentias', ()=>{
        it('should prompt the user', async () => {
            sinon.stub(inquirer, 'prompt').resolves({key : 'foo', secret : 'bar'})
            let [key, secret] = await creds.getKeyAndSecret();
            expect(key).to.equal('foo')
            expect(secret).to.equal('bar')
            expect(inquirer.prompt.calledOnce).to.be.true;
            inquirer.prompt.restore();

        })
    })
    
    context('with existing credentials', () => {
        it('should just return them', async () => {
            let[key, secret] = await creds.getKeyAndSecret()
            expect(key).to.equal('foo')
            expect(secret).to.equal('bar')
        });
    });

    after(async() => {
        await creds.clearKeyAndSecret();
    });
})
