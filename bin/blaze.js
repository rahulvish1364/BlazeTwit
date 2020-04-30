#! /usr/bin/env node
console.log('Hello Something!');

const CredentialManager = require('../lib/credential-manager');

const creds = new CredentialManager('blaze')

async function main(){
let [key, secrect] = await creds.getKeyAndSecret();
console.log(key, secrect);
} 

main().catch(console.error)