const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const paths = require('react-scripts-ts-antd/config/paths');
const custom_loaders = require('./cfg.loaders');
const {rewireEntry} = require('./cfg.entry');

function rewireModule(config, env) {
    config["module"] = {
        strictExportPresence: true,
        rules: [
            // TODO: Disable require.ensure as it's not a standard language feature.
            // We are waiting for https://github.com/facebookincubator/create-react-app/issues/2176.
            // { parser: { requireEnsure: false } },
            {
                test: /\.(js|jsx|mjs)$/,
                loader: require.resolve('source-map-loader'),
                enforce: 'pre',
                include: paths.appSrc,
            },
            {
                // "oneOf" will traverse all following loaders until one will
                // match the requirements. When no loader matches it will fall
                // back to the "file" loader at the end of the loader list.
                oneOf: [
                    custom_loaders.urlLoader,
                    custom_loaders.jsLoaderCustom,
                    custom_loaders.tsLoader,
                    custom_loaders.cssLoaderProd,
                    custom_loaders.scssLoaderCustom,
                    custom_loaders.lessLoaderCustom,
                    custom_loaders.svgLoaderCustom,
                    custom_loaders.fileLoader,
                ],
            },
        ],
    };
    return config;
}

function rewireDevModule(config, env) {
    config["module"] = {
        strictExportPresence: true,
        rules: [
            // TODO: Disable require.ensure as it's not a standard language feature.
            // We are waiting for https://github.com/facebookincubator/create-react-app/issues/2176.
            // { parser: { requireEnsure: false } },
            {
                test: /\.(js|jsx|mjs)$/,
                loader: require.resolve('source-map-loader'),
                enforce: 'pre',
                include: paths.appSrc,
            },
            {
                // "oneOf" will traverse all following loaders until one will
                // match the requirements. When no loader matches it will fall
                // back to the "file" loader at the end of the loader list.
                oneOf: [
                    custom_loaders.urlLoader,
                    custom_loaders.jsLoaderCustom,
                    custom_loaders.tsLoader,
                    custom_loaders.cssLoaderDev,
                    custom_loaders.scssLoaderCustomDev,
                    custom_loaders.lessLoaderCustomDev,
                    custom_loaders.svgLoaderCustom,
                    custom_loaders.fileLoader,
                ],
            },
        ],
    };
    return config;
}

function rewirePlugins(config, env) {
    var last_plugins_ = [];
    config.plugins.forEach(plugin => {
        switch (plugin.constructor) {
            case SWPrecacheWebpackPlugin: {
                if (env === 'development') {
                    last_plugins_.push(plugin);
                }
                break;
            }
            case HtmlWebpackPlugin: {
                break;
            }
            case ExtractTextPlugin: {
                if (env === 'production') {
                    last_plugins_.push(plugin);
                }
                break;
            }
            default: {
                last_plugins_.push(plugin);
                break;
            }
        }
    });
    if (env === 'development') {
        last_plugins_.push(
            new webpack.WatchIgnorePlugin([
                /css\.d\.ts$/
            ]),
        );
    }
    config['plugins'] = last_plugins_;
    return config;
}

function rewireOutput(config, env) {
    config["output"]["publicPath"] = "";
    if ('development' === env) {
        config["output"]["filename"] = 'static/js/[name].js';
    }
    return config;
}

function rewireResolveAlias(config, env) {
    config['resolve']['alias']['src'] = paths.appSrc;
    return config;
}

function loadOptions() {
    const args = process.argv.slice(2);
    const scriptIndex = args.findIndex(
        x => x.startsWith('---')
    );
    const script = scriptIndex === -1 ? "" : args[scriptIndex].substring(3);
    return script;
}

function modifyConfig(config, env) {
    const options_ = loadOptions();
    console.log("env: ", env);
    console.log("argv: ", options_);
    if (env === 'development') {
        config['devtool'] = 'cheap-module-inline-source-map';
        config = rewireDevModule(config, env);
    } else if (env === 'production') {
        config = rewireModule(config, env);
    }
    config = rewirePlugins(config, env);
    config = rewireOutput(config, env);
    config = rewireResolveAlias(config, env);
    config = rewireEntry(config, env, options_);
    return config;
}

module.exports = {
    modifyConfig
};