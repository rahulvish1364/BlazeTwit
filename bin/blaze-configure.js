const program = require('commander')
const pkg = require('../package.json')
const configure = require('../command/configure')
const util = require('../lib/util')
program
    .version(pkg.version)

program
    .command('consumer')
    .description('Add a twittwer API key and Secret')
    .action(() => configure.consumer(pkg.name).catch(util.handleError))
 
program
    .command('account')
    .description('Authorize access to a twitter account')
    .action(() => configure.account(pkg.name).catch(util.handleError))
    
program
    .parse(process.argv)
     
if (!process.argv.slice(2).length) {
    program.outputHelp()
}