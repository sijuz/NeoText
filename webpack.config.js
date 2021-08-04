const {InjectManifest} = require('workbox-webpack-plugin');

const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
};

module.exports = {
    // Other webpack config...
    plugins: [
        // Other plugins...
        new InjectManifest({
            swSrc: './src/service-worker.js',
        })
    ]
};