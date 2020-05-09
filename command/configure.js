const inquirer = require('inquirer')
const CredentialManager = require('../lib/credential-manager');
const util  = require('../lib/util');
const Twitter = require('../lib/twitter');
const opn = require('opn');
const querystring = require('querystring');
const { notEmpty } = require('../lib/util');
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
      await creds.storeKeyAndSecret('apiKey', answer.key, answer.secret)  
     },
     async account(name){
        let creds = new CredentialManager(name)
        var [apiKey, apiSecret] = await creds.getKeyAndSecret('apiKey')
        let twitter = new Twitter(apiKey, apiSecret)
        let response = querystring.parse(await twitter.post('oauth/request_token'))
        twitter.setToken(response['oauth_token'], response['oauth_token_secret'])
        await inquirer.prompt({
            type: 'input',
            message: 'Press enter to open the twitter in you default browser to authorize access',
            name: 'continue'
        })
        opn(`${twitter.baseUrl}oauth/authorize?oauth_token=${response['oauth_token']}`)
        let answer = await inquirer.prompt({
            type: 'input',
            message: 'Enter the Pin provided',
            name: 'pin',
            validate: util.notEmpty
        })
        let tokenRespone = querystring.parse(
            await twitter.post('oauth/access_token', `oauth_verifier=${answer.pin}`)
        )
        twitter.setToken(tokenRespone['oauth_token'], tokenRespone['oauth_token_secret'])
        let verifyResponse = await twitter.get('1.1/account/verify_credentials.json')
        await creds.storeKeyAndSecret(
            'accountToken',
            tokenRespone['oauth_token'],
            tokenRespone['oauth_token_secret']
        )
        console.log(`Account "${verifyResponse['screen_name']}" added successfully`);
        
    }
    
}

module.exports = configure