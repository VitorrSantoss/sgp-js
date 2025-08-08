import { useState } from "react";
import logo from "../../assets/sgp_logo_vertical.png";
import "./login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stayConnected, setStayConnected] = useState(true);

  const navigate = useNavigate();

  const enviarFormulario = () => {
    console.log({ email, password, stayConnected });
    navigate("/home");
  };

  return (
    <div className="bg-container">
      <div className="container container-login col-10 col-sm-8 col-md-6 col-lg-3">
        <img src={logo} alt="Sistema de Gestão de Projetos" width="200" />

        <div className="row g-3 align-items-center mb-2">
          <div className="col-12">
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="row g-3 align-items-center">
          <div className="col-12">
            <input
              type="password"
              id="inputPassword6"
              className="form-control"
              aria-describedby="passwordHelpInline"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="form-check mt-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="checkChecked"
            checked={stayConnected}
            onChange={(e) => setStayConnected(e.target.value)}
          />
          <label className="form-check-label" htmlFor="checkChecked">
            Mantenha-me conectado{" "}
          </label>
        </div>

        <button type="button" className="btn btn-primary mt-3" onClick={enviarFormulario}>
          Acessar
        </button>
      </div>
    </div>
  );
}
export default Login;