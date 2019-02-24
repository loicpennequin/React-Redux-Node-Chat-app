const withSass = require('@zeit/next-sass');
const withImages = require('next-images');

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const config = withSass({
    inlineImageLimit: 1,
    cssModules: true,
    cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: '[folder]__[local]'
    },
    webpack(config, options) {
        config.resolve.alias['components'] = path.resolve(
            __dirname,
            './src/client/components'
        );
        config.resolve.alias['utils'] = path.resolve(
            __dirname,
            './src/client/utils'
        );
        config.resolve.alias['reducers'] = path.resolve(
            __dirname,
            './src/client/reducers'
        );
        config.resolve.alias['actions'] = path.resolve(
            __dirname,
            './src/client/actions'
        );
        config.resolve.alias['constants'] = path.resolve(
            __dirname,
            './src/client/constants'
        );
        config.resolve.alias['layouts'] = path.resolve(
            __dirname,
            './src/client/layouts'
        );
        config.resolve.alias['sass'] = path.resolve(
            __dirname,
            './src/client/styles/settings/_all.scss'
        );
        config.resolve.alias['mixin'] = path.resolve(
            __dirname,
            './src/client/styles/mixins/_all.scss'
        );

        // config.module.rules.push({
        //     test: /\.svg$/,
        //     loader: 'svg-inline-loader'
        // });

        config.plugins.push(new webpack.EnvironmentPlugin(['NODE_ENV']));
        config.plugins = config.plugins.filter(
            plugin => plugin.constructor.name !== 'FriendlyErrorsWebpackPlugin'
        );
        if (options.dev && !options.isServer) {
            config.plugins.push(
                new FriendlyErrorsWebpackPlugin({ clearConsole: false })
            );
        }

        return config;
    }
});

// module.exports = config;
module.exports = withImages(config);
