const { getDefaultConfig } = require('expo/metro-config')
const path = require('node:path')

const projectRoot = __dirname

const config = getDefaultConfig(projectRoot)

config.resolver.unstable_enablePackageExports = true

// Standalone bento - watch only this repo
config.watchFolders = [projectRoot]
config.resolver.nodeModulesPaths = [path.resolve(projectRoot, 'node_modules')]

module.exports = config
