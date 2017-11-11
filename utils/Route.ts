const pathToRegexp = require('path-to-regexp')
import {parse} from 'url'

export default class Route {
  name: string
  pattern: any
  page: any
  regex: any
  keyNames: any
  toPath: any
  keys: any
  constructor({ name, pattern, page = name }) {
    if (!name && !page) {
      throw new Error(`Missing page to render for route "${pattern}"`)
    }

    this.name = name
    this.pattern = pattern || `/${name}`
    this.page = page.replace(/(^|\/)index$/, '').replace(/^\/?/, '/')
    this.regex = pathToRegexp(this.pattern, this.keys = [])
    this.keyNames = this.keys.map(key => key.name)
    this.toPath = pathToRegexp.compile(this.pattern)
  }

  match(path) {
    const values = this.regex.exec(path)
    if (values) {
      return this.valuesToParams(values.slice(1))
    }
  }

  valuesToParams(values) {
    return values.reduce((params, val, i) => {
      if (val === undefined) return params
      return Object.assign(params, {
        [this.keys[i].name]: val
      })
    }, {})
  }

  getHref(params = {}) {
    return `${this.page}?${toQuerystring(params)}`
  }

  getAs(params = {}) {
    const as = this.toPath(params) || '/'
    const keys = Object.keys(params)
    const qsKeys = keys.filter(key => this.keyNames.indexOf(key) === -1)

    if (!qsKeys.length) return as

    const qsParams = qsKeys.reduce((qs, key) => Object.assign(qs, {
      [key]: params[key]
    }), {})

    return `${as}?${toQuerystring(qsParams)}`
  }

  getUrls(params) {
    const as = this.getAs(params)
    const href = this.getHref(params)
    return { as, href }
  }
}

const toQuerystring = obj => Object.keys(obj).map(key => {
  let value = obj[key]
  if (Array.isArray(value)) {
    value = value.join('/')
  }
  return [
    encodeURIComponent(key),
    encodeURIComponent(value)
  ].join('=')
}).join('&')