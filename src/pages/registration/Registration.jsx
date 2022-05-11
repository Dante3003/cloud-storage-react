import React, { useState } from 'react'

import './registration.css'
import illustration from '../../assets/img/register-illustration.png';
import { register } from '../../actions/auth'

import Button from '../../components/button/Button.jsx';
import Input from '../../components/input/Input'
import { NavLink } from 'react-router-dom';

function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("")
  return (
    <div className="registration-container">
      <div className="registration-illustration">
        <img src={illustration} alt="illustration" />
      </div>
      <div className="registration-form__container">
        <h1 className="form-title">Registration form</h1>
        <form className="registration-form">
          <Input value={name} setValue={setName} className="form-input name-input" type="text" placeholder="Your name" />
          <Input value={email} setValue={setEmail} className="form-input email-input" type="email" placeholder="Your email" />
          <Input value={password} setValue={setPassword} className="form-input password-input" type="password" placeholder="Your password" />
          <Button type="button" class='register-btn' handleClick={() => register({ name, email, password })} text="Registration" />
        </form>
        <p>Your already have account? <NavLink to="/login">Login</NavLink> </p>
      </div>
    </div>
  )
}

export default Registration