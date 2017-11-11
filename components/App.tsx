import * as React from 'react'
import Loadable from 'react-loadable';
import Button from './common/Button.component'
import {
  Route,
  Link
} from 'react-router-dom'
import { routes } from './routes'

declare global {
  interface Function {
      displayName: string;
  }

}


// const Landing = Loadable<any, any>({
//   loader: () => import('./landing'),
//   loading: () => <div>{'load'}</div>,
// });
// const Authentication = Loadable<any, any>({
//   loader: () => import('./authentication'),
//   loading: () => <div>{'load'}</div>,
// });

export default class App extends React.Component<{match?: any}, {}>{
  render() {
    const { match } = this.props
    return (
      <div>
        {'Hello Boilterplate'}
        <Button title="name" />
        {routes}
      </div>
    )
  }
}