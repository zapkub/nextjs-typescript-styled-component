import * as React from 'react'
import Button from './common/Button.component'
import {
  Route,
  Link
} from 'react-router-dom'
// import Landing from './landing'
// const Loadable = require('react-loadable')

declare global {
  interface Function {
      displayName: string;
  }
}

// if(typeof System === "undefined") {
//   var System = {
//     import: function(path) {
//       return Promise.resolve(require(path));
//     }
//   };
// }
function loadChunk () {
  import('./landing').then((Landing) => {
    console.log(Landing)
  })
}
export default class App extends React.Component<{match?: any}, {}>{
  componentDidMount(){

    loadChunk()
  }

  render() {
    const { match } = this.props
    return (
      <div>
        {'Hello Boilterplate'}
        <Button title="name" />
        {/* <Landing /> */}
        {/* <Route path='/' component={LandingLoadable} /> */}
      </div>
    )
  }
}