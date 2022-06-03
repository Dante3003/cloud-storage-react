import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, register } from "../../actions/auth";
import { useHistory } from "react-router-dom";

import "./auth.css";
import loginIllustration from "../../assets/img/log.svg";
import registerIllustration from "../../assets/img/register.svg";
import LoginForm from "../../components/login-form/LoginForm";
import RegisterForm from "../../components/register-form/RegisterForm";

export default function Login(props) {
  const [signUpMode, setSignUpMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const dispatch = useDispatch();

  async function loginHandler(userData) {
    setLoading(true);
    await dispatch(login(userData));
    history.push("/");
  }

  async function registerHandler(userData) {
    setLoading(true);
    await dispatch(register(userData));
    history.push("/");
  }

  return (
    <div className={`wrapper ${signUpMode && "sign-up-mode"}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <LoginForm login={loginHandler} loading={loading} />
          <RegisterForm register={registerHandler} loading={loading} />
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Вы новенький?</h3>
            <p>
              Если вы новый пользователь то вам сначала нужно будет создать
              аккаунт, для этого нажмите кнопку снизу и заполните форму
            </p>
            <button
              className="btn transparent"
              id="sign-up-btn"
              onClick={() => setSignUpMode(true)}
            >
              Регистрация
            </button>
          </div>
          <img src={loginIllustration} className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>У вас уже есть аккаунт ?</h3>
            <p>
              Тогда нажмите кнопку внизу и перейдите на форму входа и введите
              данные чтобы зайти в свой аккаунт
            </p>
            <button
              className="btn transparent"
              id="sign-in-btn"
              onClick={() => setSignUpMode(false)}
            >
              Вход
            </button>
          </div>
          <img src={registerIllustration} className="image" alt="" />
        </div>
      </div>
    </div>
  );
}
