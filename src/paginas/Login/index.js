import { useState } from "react";
import logo from "../../assets/sgp_logo_vertical.png";
import "./login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stayConnected, setStayConnected] = useState(true);

  const navigate = useNavigate();

  const enviarFormulario = (e) => {
    e.preventDefault();
    console.log({ email, password, stayConnected });
    navigate("/home");
  };

  return (
    <div className="bg-container">
      <form className="container-login" onSubmit={enviarFormulario} noValidate>
        <img
          src={logo}
          alt="Sistema de Gestão de Projetos"
          className="logo"
          width="200"
          height="auto"
        />

        <input
          type="email"
          name="email"
          className="form-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="username"
          aria-label="Email"
        />

        <input
          type="password"
          name="password"
          className="form-input"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          aria-label="Senha"
        />

        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="checkStayConnected"
            checked={stayConnected}
            onChange={(e) => setStayConnected(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="checkStayConnected">
            Mantenha-me conectado
          </label>
        </div>

        <button type="submit" className="btn-login">
          Acessar
        </button>
      </form>
    </div>
  );
}

export default Login;