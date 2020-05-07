const inquirer = require('inquirer')
const CredentialManager = require('../lib/credential-manager');
const util  = require('../lib/util');
const configure = {
     async consumer(name){
        let creds = new CredentialManager(name)
        let answer =await inquirer.prompt([
            {
                type: 'input',
                name: 'key',
                message: 'Enter the twitter api key',
                validate: util.notEmpty
            },
            {
                type: 'password',
                name: 'secret',
                message: 'Enter the twitter API secret',
                validate: util.notEmpty
            }
        ])
      await creds.storeKeyAndSecret(answer.key, answer.secret)  
     }
}

module.exports = configure