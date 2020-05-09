const crypto = require('crypto')
const OAuth =  require('oauth-1.0a')
const axios = require('axios')
const { config } = require('chai')

class Twitter{
 constructor(consumerKey, consumerSecret) {
     this.baseUrl = 'https://api.twitter.com/'
     this.token = {}
     let oauth = OAuth({
         consumer: {
             key: consumerKey,
             secret: consumerSecret

         },
         signature_method: 'HMAC-SHA1',
         hash_function(baseString, key){
            return crypto.createHmac('sha1', key).update(baseString).digest('base64')

         }
     })
     axios.interceptor.request.use((config)=>{
         config.header = oauth.toHeader(oauth.authorize({
             url: `${config.baseURL}${config.url}`,
             method: config.method,
             data: config.data
         }, this.token))
         config.headers['Content-type'] = 'application/x-www-form-urlencoded'
         return config
     })
     axios.default.baseURL = this.baseUrl
    }
    setToken(key, secret){
        this.token = {key, secret}
    }
    async get(api){
            let response = await axios.get(api)
            return response.data

    }
}

module.exports = Twitter