import { useForm } from "react-hook-form";
import { useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "@/styles/Register.css";


const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
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
      .post("http://127.0.0.1:8000/auth/users/", data)
      .then((res) => {
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    return null;
  }

  return (
    <>
      <section className="register-section">
        <div className="register-form">
          <h1 className="register-title">Регистрация</h1>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="register-label">Электронная почта</label>
                <input
                  className="register-input"
                  type="text"
                  name="email"
                  {...register("email", { required: true })}
                />
              </div>
              <div>
                <label className="register-label">Пользователь</label>
                <input
                  className="register-input"
                  type="text"
                  name="username"
                  {...register("username", { required: true })}
                />
              </div>
              <div>
                <label className="register-label">Пароль</label>
                <input
                  className="register-input"
                  type="password"
                  name="password"
                  {...register("password", { required: true })}
                />
              </div>
              <div>
                <label htmlFor=""></label>
                <Button variant="primary" type="submit" className="register-button">
                  Регистрация
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
