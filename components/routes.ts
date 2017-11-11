import * as React from 'react'
import Loadable from 'react-loadable'
import RouteObject from '../utils/Route'

import {
  Route,
  Link as RouterLink
} from 'react-router-dom'

const clientRouteList = [
  {
    component: Loadable({
      loader: () => import('./authentication'),
      loading: () => React.createElement('div', {}, 'loading')
    }),
    name: 'authentication',
    path: '/login/:x'
  },
  {
    component: Loadable({
      loader: () => import('./landing'),
      loading: () => React.createElement('div', {}, 'loading')
    }),
    name: 'landing',
    path: '/home'
  }
]

const routes = []
const routeComponents = clientRouteList.map(route => {
  routes.push(new RouteObject({
    name: route.name,
    pattern: route.path
  }))
  return React.createElement(Route, {
    path: route.path,
    key: route.name,
    component: route.component
  })
})

function getPathFromName(name, params) {
  for (let route of routes) {
    if (route.name === name) {
      return route.getUrls(params).as
    }
  }
}

const Link = (props: { params?: any, name: string, children?: any }) => {
  return React.createElement(RouterLink, {
    to: getPathFromName(props.name, props.params)
  }, props.children)
}
export { routeComponents as routes, Link }


