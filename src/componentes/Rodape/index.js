import miniatura from "../../arquivos/imagens/treina_recife_miniatura.png";
import estilos from "./Rodape.module.css";

function Rodape() {
    return (
        <footer className={estilos.rodape}>
            <img src={miniatura} alt="" width="1842" height="1865" />
            <p>Treina Recife &copy; {new Date().getFullYear()}</p>
        </footer>
    );
}

export default Rodape;
