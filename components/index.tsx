

import { BrowserRouter as Router } from 'react-router-dom'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Loadable from 'react-loadable';
import App from './App'

if (typeof window !== 'undefined') {
  (window as any).main = () => {
    (Loadable as any).preloadReady().then(() => {
      console.log('Mount app to DOM!')
      const rootDOM = document.getElementById('root')
      ReactDOM.hydrate(<Router><App /></Router>, rootDOM)
    });
  };
}