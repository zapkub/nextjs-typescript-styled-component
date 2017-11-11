import * as React from 'react'
import Loadable from 'react-loadable'

import {
  Route,
  Link
} from 'react-router-dom'

const routes = [
  {
    component: Loadable({
      loader: () => import('./authentication'),
      loading: () => React.createElement('div',{}, 'loading')
    }),
    name: 'authentication',
    path: '/login'
  },
  {
    component: Loadable({
      loader: () => import('./landing'),
      loading: () => React.createElement('div',{}, 'loading')
    }),
    name: 'landing',
    path: '/home'
  }
]

export default routes.map(route => {
  return React.createElement(Route, {
    path: route.path,
    key: route.name,
    component: route.component
})


