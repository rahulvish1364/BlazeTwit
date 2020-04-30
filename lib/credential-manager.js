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
    if (key) {
        let secret = await keystar.getPassword(this.service, key)
        return [key, secret]
    } else {
        let answer = await inquirer.prompt([
            {type: 'input', name: 'key', message : 'Enter your twitter API Key'},
            {type: 'password', name: 'secret', message: 'Enter your Twitter API Secret'}
        ])
        this.conf.set('apiKey', answer.key);
        await keystar.setPassword(this.service, answer.key, answer.secret)
        return [answer.key, answer.secret]
    }
}

async clearKeyAndSecret(){
    let key  = this.conf.get('apiKey');
    this.conf.delete('apiKey')
    await keystar.deletePassword(this.service, key)
}

}

module.exports = CredentialManager