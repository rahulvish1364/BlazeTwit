const program = require('commander')
const pkg = require('../package.json')


program
    .version(pkg.version)

program
    .parse(process.argv)
     
if (!process.argv.slice(2).length) {
    program.outputHelp()
}