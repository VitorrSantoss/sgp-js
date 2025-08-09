import { useEffect, useState } from "react";
import Cabecalho from "../../../componentes/Cabecalho";
import Rodape from "../../../componentes/Rodape";
import {
  atualizarUsuario,
  buscarUsuarioPeloId,
  cadastrarUsuarios,
} from "../../../servicos/usuarios";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

function FormularioUsuario() {
  const { id } = useParams();

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (id) {
      buscarUsuarioPeloId(
        id,
        setNome,
        setCpf,
        setEmail,
        setSenha,
        setDataNascimento,
        setStatus

      );
    }
  }, []);

  const enviarFormulario = async (e) => {
    e.preventDefault();

    const usuario = {
      nome,
      cpf,
      email,
      senha,
      dataNascimento: format(dataNascimento, "dd/MM/yyyy", { locale: ptBR }),
      status,
    };

    if (id) {
      await atualizarUsuario(id, usuario, navigate);
    } else {
      await cadastrarUsuarios(usuario, navigate);
    }
  }

  const navigate = useNavigate();

  const cancelarFormulario = () => {
    navigate("/usuarios");
  };

  return (
    <>
      <Cabecalho />
      <section className="container mt-3" id="novo-usuario">
        <h1>Dados do Usuário</h1>

        <form className="row g-3" onSubmit={enviarFormulario}>
          <div className=" col-md-6 col-12">
            <label htmlFor="nome" className="form-label">
              Nome
            </label>
            <input
              type="text"
              className="form-control"
              id="nome"
              placeholder="Digite seu nome..."
              defaultValue={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className=" col-md-6 col-12">
            <label htmlFor="cpf" className="form-label">
              CPF
            </label>
            <input
              type="text"
              className="form-control"
              id="cpf"
              placeholder="XXX.XXX.XXX-XX"
              defaultValue={cpf}
              onChange={(e) => setCpf(e.target.value)}
              required
            />
          </div>

          <div className=" col-md-6 col-12">
            <label htmlFor="cpf" className="form-label">
              E-mail
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="nome@email.com"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className=" col-md-6 col-12">
            <label htmlFor="cpf" className="form-label">
              Senha
            </label>
            <input
              type="password"
              className="form-control"
              id="senha"
              placeholder="******"
              defaultValue={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <div className=" col-md-6 col-12">
            <label htmlFor="cpf" className="form-label">
              Data de Nascimento
            </label>
            <input
              type="date"
              className="form-control"
              id="dataNascimento"
              placeholder="XX/XX/XXXX"
              defaultValue={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              required
            />
          </div>

          <div className=" col-md-6 col-12">
            <label htmlFor="cpf" className="form-label">
              Status
            </label>
            <select
              id="status"
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option disabled value="">
                {" "}
                Escolha uma opção...
              </option>
              <option value={"ATIVO"}>Ativo</option>
              <option value={"INATIVO"}>Inativo</option>
            </select>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Salvar
            </button>
            <button
              className="btn btn-outline-primary ms-2"
              onClick={cancelarFormulario}
            >
              Cancelar
            </button>
          </div>
        </form>
      </section>

      <Rodape />
    </>
  );
}

export default FormularioUsuario;