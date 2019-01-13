/* webpack.client.js */
const path = require('path');
const projectRoot = path.resolve(__dirname, '..');
const VueLoaderPlugin = require('vue-loader/lib/plugin');


module.exports = {
    entry: [path.join(projectRoot, 'src/entry-client.js')],
    output: {
        publicPath: '/',
        path: path.join(projectRoot, '/dist/'),
        filename: 'bundle.client.js',
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: projectRoot,
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'img/[name].[hash:7].[ext]'
                    }
                }
            },
            {
                test: /\.styl(us)?$/,
                loader: "vue-style-loader!css-loader!stylus-loader"
            }
        ]
    },
    plugins: [new VueLoaderPlugin()],
    resolve: {
        // alias: {
        //     'vue$': 'vue/dist/vue.common.js'
        // }
    }
}
