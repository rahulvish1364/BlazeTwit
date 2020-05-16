const Configstore = require('configstore');
const inquirer = require('inquirer')
const keystar = require('keytar');
class CredentialManager
{
constructor(name){
        this.conf = new Configstore(name);
        this.service = name
    }
async getKeyAndSecret(prop){
    let key = this.conf.get(prop);
    if (!key) {
        throw new Error('Api Key Not Found')
    } 
    let secret = await keystar.getPassword(this.service, key)
    return [key, secret]
}
async storeKeyAndSecret(prop, key, secret){
    this.conf.set(prop, key)
    await keystar.setPassword(this.service, key, secret)
}

async clearKeyAndSecret(prop){
    let key  = this.conf.get(prop);
    this.conf.delete(prop)
    await keystar.deletePassword(this.service, key)
}

}

module.exports = CredentialManager