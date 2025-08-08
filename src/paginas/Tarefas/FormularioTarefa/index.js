import { useState } from "react";
import Cabecalho from "../../../componentes/Cabecalho";
import Rodape from "../../../componentes/Rodape";

function FormularioTarefa() {
  const [id, setId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [dataCriacao, setDataCriacao] = useState("");
  const [dataConclusao, setDataConclusao] = useState("");
  const [prioridade, setPrioridade] = useState("");
  const [status, setStatus] = useState("");
  const [projeto, setProjeto] = useState("");

  return (
    <>
      <Cabecalho />
      <section className="container mt-3" id="novo-usuario">
        <h1>Dados da Tarefa</h1>

        <form className="row g-3" onSubmit={() => { }}>
          <div className=" col-md-12 col-12">
            <label htmlFor="nome" className="form-label">
              Título
            </label>
            <input
              type="text"
              className="form-control"
              id="titulo"
              placeholder="Defina um título"
              defaultValue={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>

          <div className=" col-md-4 col-12">
            <label htmlFor="dataCriacao" className="form-label">
              Data de Criação
            </label>
            <input
              type="date"
              className="form-control"
              id="dataCriacao"
              placeholder="dd/mm/aaaa"
              defaultValue={dataCriacao}
              onChange={(e) => setDataCriacao(e.target.value)}
              required
            />
          </div>

          <div className=" col-md-4 col-12">
            <label htmlFor="dataConclusao" className="form-label">
              Data de Conclusão
            </label>
            <input
              type="date"
              className="form-control"
              id="dataConclusao"
              placeholder="dd/mm/aaaa"
              defaultValue={dataConclusao}
              onChange={(e) => setDataConclusao(e.target.value)}
              required
            />
          </div>

          <div className=" col-md-4 col-12">
            <label htmlFor="atribuirUsuario" className="form-label">
              Atribuir para:
            </label>
            <select
              id="atribuirUsuario"
              className="form-select"
              //defaultValue={prioridade}
              //onChange={(e) => setPrioridade(e.target.value)}
              required
            >
              <option disabled value="">
                {" "}
                Escolha uma opção...
              </option>
              <option value={"USUARIO1"}>Usuário 1</option>
              <option value={"USUARIO2"}>Usuário 2</option>
              <option value={"USUARIO3"}>Usuário 3</option>
            </select>
          </div>

          <div className=" col-md-4 col-12">
            <label htmlFor="prioridade" className="form-label">
              Prioridade:
            </label>
            <select
              id="prioridade"
              className="form-select"
              defaultValue={prioridade}
              onChange={(e) => setPrioridade(e.target.value)}
              required
            >
              <option disabled value="">
                {" "}
                Escolha uma opção...
              </option>
              <option value={"ALTA"}>Alta</option>
              <option value={"MEDIA"}>Média</option>
              <option value={"BAIXA"}>Baixa</option>
            </select>
          </div>

          <div className=" col-md-4 col-12">
            <label htmlFor="status" className="form-label">
              Status:
            </label>
            <select
              id="status"
              className="form-select"
              defaultValue={status}
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

          <div className=" col-md-4 col-12">
            <label htmlFor="projeto" className="form-label">
              Projeto:
            </label>
            <select
              id="projeto"
              className="form-select"
              defaultValue={projeto}
              onChange={(e) => setProjeto(e.target.value)}
              required
            >
              <option disabled value="">
                {" "}
                Escolha uma opção...
              </option>
              <option value={"PROJETO1"}>Projeto 1</option>
              <option value={"PROJETO2"}>Projeto 2</option>
              <option value={"PROJETO3"}>Projeto 3</option>
            </select>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Salvar
            </button>
            <button className="btn btn-outline-primary ms-2" onClick={() => { }}>
              Cancelar
            </button>
          </div>
        </form>
      </section>

      <Rodape />
    </>
  );
}

export default FormularioTarefa;