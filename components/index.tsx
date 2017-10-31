

import { BrowserRouter as Router } from 'react-router-dom'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'

if (typeof window !== 'undefined') {
  const rootDOM = document.getElementById('root')
  ReactDOM.hydrate(<Router><App /></Router>, rootDOM)
}