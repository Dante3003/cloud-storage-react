import React from 'react'

import './input.css';

function Input(props) {
  return (
    <input onChange={(event) => props.setValue(event.target.value)} value={props.value} className="form-input" type={props?.type || 'text'} placeholder={props?.placeholder} />
  )
}


export default Input
