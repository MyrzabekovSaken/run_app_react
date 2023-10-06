import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";
import "@/styles/Login.css";


const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      navigate("/client");
    }
  }, [navigate]);

  const onSubmit = (data) => {
    axios
      .post(`http://localhost:8000/auth/jwt/create/`, data)
      .then((res) => {
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        axios
          .get(`http://localhost:8000/auth/users/me/`, {
            headers: {
              Authorization: `Bearer ${res.data.access}`,
            },
          })
          .then((res) => {
            localStorage.setItem("user", JSON.stringify(res.data));
            if (res.data.username === 'admin') {
              navigate("/coach");
            } else {
              navigate("/client");
            }
          })
          .catch((err) => {
            console.error(err);
            setErrorMessage("Неверное имя пользователя или пароль");
          });
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("Неверное имя пользователя или пароль");
      });
  };

  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    return null;
  }

  return (
    <>
      <section className="login-section">
        <div className="login-div">
          <h1 className="login-title">Вход</h1>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="login-form">Пользователь</label>
                <input
                  className="login-input"
                  type="text"
                  placeholder="Имя пользователя"
                  name="username"
                  {...register("username", { required: true })}
                  // value={"andre"}
                />
              </div>
              <div>
                <label className="login-form">Пароль</label>
                <input
                  className="login-input"
                  type="password"
                  placeholder="Пароль"
                  name="password"
                  {...register("password", { required: true })}
                  // value={"Pass123!"}
                />
              </div>
              <div>
                <Button
                  variant="primary"
                  type="submit"
                  className="login-button"
                >
                  Войти
                </Button>
              
                <Button
                  variant="outline-primary"
                  onClick={() => navigate("/register")}
                  className="login-register-button"
                >
                  Регистрация
                </Button>
              </div>
            </form>
            {errorMessage && <p className="login-error-message">{errorMessage}</p>}
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
