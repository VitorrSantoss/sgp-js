import { useEffect, useState } from "react";
import Cabecalho from "../../componentes/Cabecalho";
import Rodape from "../../componentes/Rodape";
import { useNavigate } from "react-router-dom";
import { listarProjetos } from "../../servicos/projetos";

function Projetos() {
  const navigate = useNavigate();
  const [projetos, setProjetos] = useState([]);

  useEffect(() => {
    listarProjetos(setProjetos);
  }, []);

  const redirecionarParaNovoProjeto = () => {
    navigate("/projetos/novo");
  };

  return (
    <>
      <Cabecalho />
      <section className="container mt-3" id="usuarios">
        <div className="d-flex justify-content-between">
          <h1>Projetos Cadastradas</h1>
          <div className="d-flex align-self-center">
            <button
              className="btn btn-primary"
              onClick={redirecionarParaNovoProjeto}
            >
              Novo Projeto
            </button>
          </div>
        </div>

        <table className="table table-hover">
          <thead>
            <tr>
              <th>ID </th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Responsável</th>
              <th>Opções</th>
            </tr>
          </thead>

          <tbody>
            {projetos.map((projetos) => (
              <tr key={projetos.id}>
                <td>{projetos.id}</td>
                <td>{projetos.nome}</td>
                <td>{projetos.descricao}</td>
                <td>{projetos.responsavel}</td>
                <td>
                  <div className="btn-group">
                    <button className="btn btn-warning" onClick={() => { }}>
                      Editar
                    </button>
                    <button className="btn btn-danger" onClick={() => { }}>
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

export default Projetos;