#!/usr/bin/env node
//指定解释器

//定制命令行工具
const program = require('commander')

program.version(require('../package.json').version)

program.command('init <name>')
      .description('init project')
      .action(require('../lib/init'))

program.command('refresh')
      .description('refresh project')
      .action(require('../lib/refresh'))

program.command('serve')
    .description('serve')
    .action(require('../lib/serve'))
    
program.parse(process.argv)
