import robo404 from "../../assets/robo_404.png";
import Cabecalho from "../../componentes/Cabecalho";
import Rodape from "../../componentes/Rodape";

function Home() {
  return (
    <div className="container-home">
      <Cabecalho />

      <div className="container container-alert col-10 col-sm-8 col-md-6 col-lg-7 mt-3">
        <div className="alert alert-warning" role="alert">
          Esta página não existe!
        </div>
      </div>

      <div className="d-flex justify-content-center mt-3">
        <img
          src={robo404}
          alt="404"
          className="img-fluid"
          style={{ maxWidth: "450px" }}
        />
      </div>

      <Rodape />
    </div>
  );
}

export default Home;