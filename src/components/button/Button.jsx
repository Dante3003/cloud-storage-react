import React from 'react'

import './button.css';
function Button(props) {
  function clickHandler() {
    if (typeof props.handleClick === 'function') {
      props.handleClick()
    }
  }
  return <button className={`btn ${props?.class || ''}`} type={props.type} onClick={clickHandler}>{props.children}</button>
}

export default Button
