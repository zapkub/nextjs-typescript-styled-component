
import * as path from 'path'
import * as fs from 'fs'
import * as React from 'react'
import { StaticRouter as Router } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import { getBundles } from 'react-loadable/webpack'
import { transformFileSync } from 'babel-core';
/**
 * Use require for no default export lib
 */
const express = require('express')
const Loadable = require('react-loadable')
const stats = require('./public/react-loadable.json')


interface Loadable {
  Capture: any
}


let proto = Object.getPrototypeOf(require);
!proto.hasOwnProperty("ensure") && Object.defineProperties(proto, {
  "ensure": {
    value: function ensure(modules, callback) {
      callback(this);
    },
    writable: false
  },
  "include": {
    value: function include() { },
    writable: false
  }
});

const app = express()

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack')
  const webpackMiddleware = require('webpack-dev-middleware')
  const compiler = webpack(require('./webpack.config'))
  app.use(
    webpackMiddleware(compiler ,
      {
        publicPath: '/public/',
        hot: true,
        stats: {
          chunks: false,
          color: true,
          lazy: true
        }
      }
  ))
  app.use(require("webpack-hot-middleware")(compiler));
}

const port = process.env.PORT || 3000

const __html = fs.readFileSync(path.join(__dirname, 'index.html')).toString()
function clearRequireCache() {
  const keys = Object.keys(require.cache)
    .filter(key => /.+\/components/.test(key))
    .forEach(key => {
      delete require.cache[key]
    })
}
app.get('*', async (req, res) => {

  const modules = []
  const App = require('./components/App').default

  clearRequireCache()
  await Loadable.preloadAll()
  const RenderedApp = renderToString(
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <Router location={req.url} context={{}}>
        <App />
      </Router>
    </Loadable.Capture>)
  let bundles = getBundles(stats, modules)
  const PreloadModule = bundles.map(bundle => {
    if (/.+\.map/.test(bundle.file)) {
      return ''
    }
    return `<script src="/public/${bundle.file}"></script>`
  }).join('\n')

  /**
   * Render React HTML Result to client
   * and write preload componenet script to client
   */
  let html = __html.replace('{{app-root}}', RenderedApp)
  html = html.replace('{{server-script}}', PreloadModule)

  res.send(html)
})


Loadable.preloadAll().then(() => {
  app.listen(port, function () {
    console.log(`listen ${port}`)
  })
}).catch(err => {
  console.log(err);
});