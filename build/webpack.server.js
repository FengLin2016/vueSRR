/* webpack.server.js */
const path = require('path');
const projectRoot = path.resolve(__dirname, '..');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    // 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
    target: 'node',
    entry: [path.join(projectRoot, 'src/entry-server.js')],
    output: {
        publicPath: '/',
        libraryTarget: 'commonjs2',
        path: path.join(projectRoot, '/dist/'),
        filename: 'bundle.server.js',
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
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
                test: /\.js$/,
                loader: 'babel-loader',
                include: projectRoot,
                exclude: /node_modules/,
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
