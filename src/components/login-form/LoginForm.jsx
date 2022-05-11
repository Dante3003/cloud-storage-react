import { useState } from "react";

import lockIcon from "../../assets/img/lock-closed.svg";
import userIcon from "../../assets/img/user.svg";

export default function LoginForm({ login, loading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submitHandler(e) {
    e.preventDefault();
    login({ email, password });
  }

  return (
    <form
      action="#"
      className="sign-in-form"
      onSubmit={submitHandler}
      autoComplete="off"
    >
      <h2 className="title">Вход</h2>
      <div className="input-field">
        <div className="form-icon">
          <img src={userIcon} alt="имя пользователя" />
        </div>
        <input
          value={email}
          onInput={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="элекетронная почта"
          autoComplete="off"
        />
      </div>
      <div className="input-field">
        <div className="form-icon">
          <img src={lockIcon} alt="Пароль" />
        </div>
        <input
          value={password}
          onInput={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Пароль"
          autoComplete="off"
        />
      </div>
      <input
        disabled={loading}
        type="submit"
        value="Вход"
        className="btn solid auth-btn"
      />
      {/* <p className="social-text">Or Sign in with social platforms</p> */}
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
