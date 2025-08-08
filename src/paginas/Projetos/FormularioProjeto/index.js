import { useState } from "react";
import Cabecalho from "../../../componentes/Cabecalho";
import Rodape from "../../../componentes/Rodape";

function FormularioProjeto() {
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [responsavel, setResponsavel] = useState("");

  return (
    <>
      <Cabecalho />
      <section className="container mt-3" id="novo-usuario">
        <h1>Dados do Projeto</h1>

        <form className="row g-3" onSubmit={() => { }} />
        <div className=" col-md-12 col-12 mt-4 mb-2">
          <label htmlFor="nome" className="form-label">
            Nome:
          </label>
          <input
            type="text"
            className="form-control"
            id="nome"
            placeholder="Digite o nome do projeto"
            defaultValue={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <form className="row g-3" onSubmit={() => { }}>
          <div className=" col-md-12 col-12 mt-4">
            <label htmlFor="descricao" className="form-label">
              Descrição:
            </label>
            <textarea
              type="text"
              className="form-control"
              id="descricao"
              rows="5"
              placeholder=""
              defaultValue={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
          </div>


          <div className=" col-md-12 col-12">
            <label htmlFor="responsavel" className="form-label">
              Responsável:
            </label>
            <select
              id="responsavel"
              className="form-select"
              defaultValue={responsavel}
              onChange={(e) => setResponsavel(e.target.value)}
              required
            >
              <option disabled value="">
                {" "}
                Escolha uma opção...
              </option>
              <option value={"USUARIO1"}>Usuário 1</option>
              <option value={"USUARIO2"}>Usuário 2</option>
              <option value={"USUARIO 3"}>Usuário 3</option>
            </select>
          </div>

        </form>
      </section>

      <Rodape />
    </>
  );
}

export default FormularioProjeto;