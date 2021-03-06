const program = require('commander')
const pkg = require('../package.json')
const configure = require('../command/configure')

program
    .version(pkg.version)

program
    .command('consumer')
    .description('Add a twittwer API key and Secret')
    .action(async ()=>{
        await configure.consumer(pkg.name)
    })
 
program
    .command('account')
    .description('Authorize access to a twitter account')
    .action(async ()=>{
        await configure.account(pkg.name)
    })
program
    .parse(process.argv)
     
if (!process.argv.slice(2).length) {
    program.outputHelp()
}