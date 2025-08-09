import robo404 from "../../assets/robo_404.png";
import Cabecalho from "../../componentes/Cabecalho";
import Rodape from "../../componentes/Rodape";

function Home() {
  return (
    <div className="container-home">
      <Cabecalho />

      <main className="content">
        <div className="alert alert-warning" role="alert">
          <h1>Página não encontrada</h1>
          <p>A página que você está tentando acessar não existe.</p>
        </div>

        <img
          src={robo404}
          alt="Robô 404"
          className="img-404"
        />

        <a href="/" className="btn-home">
          Voltar para a página inicial
        </a>
      </main>

      <Rodape />
    </div>
  );
}

export default Home;
