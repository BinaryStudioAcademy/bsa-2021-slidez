const path = require('path')

module.exports = (config) => {
    config.resolve.alias = {
        ...config.resolve.alias,
        'slidez-shared': path.resolve(__dirname, '../slidez-shared'),
    }
    // Remove the ModuleScopePlugin which throws when we try
    // to import something outside of src/.
    config.resolve.plugins.pop()

    // Let Babel compile outside of src/.
    const oneOfRule = config.module.rules.find((rule) => rule.oneOf)
    const tsRule = oneOfRule.oneOf.find((rule) =>
        rule.test.toString().includes('ts|tsx')
    )
    tsRule.include = undefined
    tsRule.exclude = /node_modules/

    return config
}
