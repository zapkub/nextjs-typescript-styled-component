import * as React from 'react'
import { Link } from '../routes'


export default class Landing extends React.Component<{}, {}>{

  render() {
    return (
      <div>
        {'Oh yeah Login page ja'}
        <Link name='landing'>{'go to home'}</Link>
      </div>
    )
  }
}