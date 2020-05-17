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
    let key = this.conf.get(`keys.${prop}`);
    if (!key) {
        throw new Error(`Missing ${prop} key -- have your run 'cofigure ${prop}?`)
    } 
    let secret = await keystar.getPassword(this.service, key)
    if (!secret) {
        throw new Error(`Missing ${prop} secret -- have your run 'cofigure ${prop}?`)
    }
    return [key, secret]
}
async storeKeyAndSecret(prop, key, secret){
    this.conf.set(`keys.${prop}`, key)
    await keystar.setPassword(this.service, key, secret)
}

async clearKeyAndSecret(prop){
    let key  = this.conf.get(`keys.${prop}`);
    this.conf.delete(`keys.${prop}`)
    await keystar.deletePassword(this.service, key)
}
async clearAll(){
    for(let prop of Object.keys(this.conf.get('keys'))){
        await this.clearKeyAndSecret(prop)
    }
}

}

module.exports = CredentialManager