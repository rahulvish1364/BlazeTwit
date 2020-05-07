#! /usr/bin/env node

// console.log('Hello Something!');

// const CredentialManager = require('../lib/credential-manager');

// const creds = new CredentialManager('blaze')

// async function main(){
// let [key, secrect] = await creds.getKeyAndSecret();
// console.log(key, secrect);
// } 

// main().catch(console.error)



const program = require('commander');
const pkg = require('../package.json');

program
    .version(pkg.version)
    .command('configure', 'configure Twitter related credentials')
    .parse(process.argv)
