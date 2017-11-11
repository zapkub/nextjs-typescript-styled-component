import * as React from 'react'

import { Link } from '../routes'
export default class Landing extends React.Component<{}, {}>{


  render() {
    return (
      <div>
        {'Oh yeah Landing page ja wooooo'}
        <Link name='authentication' params={{x: 0}}>{'login'}</Link>
      </div>
    )
  }
}