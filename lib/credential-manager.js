const Configstore = require('configstore');
const inquirer = require('inquirer')
const keystar = require('keytar');
class CredentialManager
{
constructor(name){
        this.conf = new Configstore(name);
        this.service = name
    }
async getKeyAndSecret(){
    let key = this.conf.get('apiKey');
    if (!key) {
        throw new Error('Api Key Not Found')
    } 
    let secret = await keystar.getPassword(this.service, key)
    return [key, secret]
}
async storeKeyAndSecret(key, secret){
    this.conf.set('apiKey', key)
    await keystar.setPassword(this.service, key, secret)
}

async clearKeyAndSecret(){
    let key  = this.conf.get('apiKey');
    this.conf.delete('apiKey')
    await keystar.deletePassword(this.service, key)
}

}

module.exports = CredentialManager