  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const webpack = require('webpack');

  module.exports = {
    entry: [     
      'webpack-dev-server/client?http://0.0.0.0:8080', 'webpack/hot/only-dev-server', './index.js'
    ],
    output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'buddle.js'
	},
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
      hot: true
    },
  
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Hot Module Replacement',
        template: './index.html'
      }),
      new webpack.HotModuleReplacementPlugin()
    ],
    module: {
	    rules: [
	      {
	        test: /\.js$/,
	        use: [
	          {
	            loader: 'react-hot-loader/webpack'
	          }, {
	            loader: 'babel-loader'
	          }
	        ],
	        exclude: /node_modules/
	      }, {
	        test: /\.css/,
	        use: ['style-loader', 'css-loader']
	      }, {
	        test: /\.scss$/,
	        use: [
	          {
	            loader: "style-loader"
	          }, {
	            loader: "css-loader"
	          }, {
	            loader: "sass-loader"
	          }
	        ]
	      }
	    ]
	  }
  };
/*
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './index.js',
	output: {
		path: __dirname,
		filename: './dist/buddle.js'
	},
    devServer: {
        contentBase: './dist',
        hot: true
    },
    
	plugins: {		
		new HtmlWebpackPlugin({
	        title: 'Hot Module Replacement'
	    }),
	    new webpack.HotModuleReplacementPlugin()
	},
	
	module: {
		loaders: [
            {
            	test: /\.js?$/,
            	exclude: '/node_modules/',
            	loader: 'babel-loader',            	
            }, 
            {
            	test: /\.css$/,
            	loader: 'style-loader!css-loader'
            }
		]
	},
   /*
	resolve: {
		extensions: ['js', 'jsx', 'css', 'less']
	}
	
	
	
	
}
*/