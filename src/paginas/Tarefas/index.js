import { useEffect, useState } from "react";
import Cabecalho from "../../componentes/Cabecalho";
import Rodape from "../../componentes/Rodape";
import { useNavigate } from "react-router-dom";
import { listarTarefas } from "../../servicos/tarefas";


function Tarefas() {
  const navigate = useNavigate();
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    listarTarefas(setTarefas);
  }, []);

  const redirecionarParaNovaTarefa = () => {
    navigate("/tarefas/nova");
  }

  return (
    <>
      <Cabecalho />
      <section className="container mt-3" id="usuarios">
        <div className="d-flex justify-content-between">
          <h1>Tarefas Cadastradas</h1>
          <div className="d-flex align-self-center">
            <button className="btn btn-primary" onClick={redirecionarParaNovaTarefa}>
              Nova Tarefa
            </button>
          </div>
        </div>

        <table className="table table-hover">
          <thead>
            <tr>
              <th>ID </th>
              <th>Título</th>
              <th>Data de Criação</th>
              <th>Data de Conclusão</th>
              <th>Prioridade</th>
              <th>Status</th>
              <th>Projeto</th>
              <th>Opções</th>
            </tr>
          </thead>

          <tbody>
            {tarefas.map((tarefas) => (
              <tr key={tarefas.id}>
                <td>{tarefas.id}</td>
                <td>{tarefas.titulo}</td>
                <td>{tarefas.dataCriacao}</td>
                <td>{tarefas.dataConclusao}</td>
                <td>{tarefas.prioridade}</td>
                <td>{tarefas.status}</td>
                <td>{tarefas.projeto}</td>
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

export default Tarefas;