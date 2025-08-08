import { useEffect, useState } from "react";
import { deletarUsuario, listarUsuarios } from "../../servicos/usuarios";
import Cabecalho from "../../componentes/Cabecalho";
import Rodape from "../../componentes/Rodape";
import { useNavigate } from "react-router-dom";

function Usuarios() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    listarUsuarios(setUsuarios);
  }, []);

  const redirecionarParaNovoUsuario = () => {
    navigate("/usuarios/novo");
  }

  const excluirUsuario = async (id) => {
    await deletarUsuario(id);

    window.location.reload();
  }

  return (
    <>
      <Cabecalho />
      <section className="container mt-3" id="usuarios">
        <div className="d-flex justify-content-between">
          <h1>Usuários Cadastrados</h1>
          <div className="d-flex align-self-center">
            <button className="btn btn-primary" onClick={redirecionarParaNovoUsuario}>
              Novo Usuário
            </button>
          </div>
        </div>

        <table className="table table-hover">
          <thead>
            <tr>
              <th>ID </th>
              <th>Nome</th>
              <th>CPF</th>
              <th>E-mail</th>
              <th>Idade</th>
              <th>Status</th>
              <th>Opções</th>
            </tr>
          </thead>

          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nome}</td>
                <td>{usuario.cpf}</td>
                <td>{usuario.email}</td>
                <td>{usuario.idade}</td>
                <td>{usuario.status}</td>
                <td>
                  <div className="btn-group">
                    <button className="btn btn-warning" onClick={() => navigate(`/usuarios/${usuario.id}`)}>
                      Editar
                    </button>
                    <button className="btn btn-danger" onClick={() => excluirUsuario(usuario.id)}>
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </section>
      <Rodape />
    </>
  );
}

export default Usuarios;