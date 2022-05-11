import { useState } from "react";

import lockIcon from "../../assets/img/lock-closed.svg";
import userIcon from "../../assets/img/user.svg";
import mailIcon from "../../assets/img/mail.svg";

export default function RegisterForm({ register, loading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  function submitHandler(e) {
    e.preventDefault();
    register({ name, email, password });
  }

  return (
    <form action="#" className="sign-up-form" onSubmit={submitHandler}>
      <h2 className="title">Регистрация</h2>
      <div className="input-field">
        <div className="form-icon">
          <img src={userIcon} alt="username" />
        </div>
        <input
          value={name}
          onInput={(e) => setName(e.target.value)}
          type="text"
          placeholder="Имя пользователя"
          autoComplete="off"
        />
      </div>
      <div className="input-field">
        <div className="form-icon">
          <img src={mailIcon} alt="username" />
        </div>
        <input
          value={email}
          onInput={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Электронная почта"
          autoComplete="off"
        />
      </div>
      <div className="input-field">
        <div className="form-icon">
          <img src={lockIcon} alt="username" />
        </div>
        <input
          value={password}
          disabled={loading}
          onInput={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Пароль"
          autoComplete="off"
        />
      </div>
      <input type="submit" className="btn auth-btn" value="Регистрация" />
      {/* <p className="social-text">Or Sign up with social platforms</p> */}
      {/* <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div> */}
    </form>
  );
}
