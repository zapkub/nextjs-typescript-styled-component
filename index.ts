import * as express from 'express'
import * as path from 'path'
import * as fs from 'fs'
import * as React from 'react'
import { StaticRouter as Router } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import App from './components/App'

const app = express()

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack')
  const webpackMiddleware = require("webpack-dev-middleware");
  app.use(
    webpackMiddleware(
      webpack(require('./webpack.config')),
      {
        publicPath: "/public/",
        stats: {
          color: true,
          lazy: true
        }
      }
    ));
}

const port = process.env.PORT || 3000

const __html = fs.readFileSync(path.join(__dirname, 'index.html')).toString()

app.get('/', (req, res) => {
  const RenderedApp = renderToString(
    React.createElement(Router, {
      context: {}
    },
        React.createElement(App)
    ))
  res.send(__html.replace('{{app-root}}', RenderedApp))
})

app.listen(port, function () {
  console.log(`listen ${port}`)
})