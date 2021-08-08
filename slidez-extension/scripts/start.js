'use strict'

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
    throw err
})

// Ensure environment variables are read.
require('../config/env')

const fs = require('fs')
const chalk = require('react-dev-utils/chalk')
const webpack = require('webpack')
const clearConsole = require('react-dev-utils/clearConsole')
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles')
const paths = require('../config/paths')
const configFactory = require('../config/webpack.config')
const isInteractive = process.stdout.isTTY

// Warn and crash if required files are missing
if (
    !checkRequiredFiles([
        paths.appHtml,
        paths.chromeExtensionBackground,
        paths.chromeExtensionContentScript,
        paths.chromeExtensionOptions,
        paths.chromeExtensionPopup,
    ])
) {
    process.exit(1)
}

// We require that you explicitly set browsers and do not fall back to
// browserslist defaults.
const { checkBrowsers } = require('react-dev-utils/browsersHelper')
clearConsole()
console.log(chalk.cyan('Starting the development server...'))
checkBrowsers(paths.appPath, isInteractive).then(() => {
    const config = configFactory('development')
    const compiler = webpack(config)
    compiler.hooks.watchRun.tapAsync('Console message', (compiler, cb) => {
        clearConsole()
        console.log(chalk.yellow('Changes detected, recompiling...'))
        cb()
    })
    compiler.watch(
        {
            aggregateTimeout: 1000,
        },
        (err, stats) => {
            clearConsole()
            if (err) {
                chalk.red(err)
                return
            }

            console.log(
                stats.toString({
                    chunks: false, // Makes the build much quieter
                    colors: true, // Shows colors in the console
                })
            )
        }
    )
})
