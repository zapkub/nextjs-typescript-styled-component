import * as React from 'react'
const Button = (props: { title: string }) => {
  return (
    <button>{props.title}</button>
  )
}
Button.displayName = 'BasicButton'

export default Button