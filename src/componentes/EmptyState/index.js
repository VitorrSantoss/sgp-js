import roboImagem from "../../arquivos/imagens/robo_404.png";
import estilos from "./EmptyState.module.css";

// Estado vazio, de erro ou 404: `robo` mostra a imagem; `icone`, um ícone discreto.
function EmptyState({ titulo, texto, acao, icone: Icone, robo, grande, nivel: Titulo = "h2" }) {
    return (
        <div className={`${estilos.estado} ${grande ? estilos.grande : ""}`}>
            {robo && <img src={roboImagem} alt="" width="500" height="500" className={estilos.robo} />}
            {Icone && <Icone size={28} className={estilos.icone} aria-hidden="true" />}
            <Titulo className={estilos.titulo}>{titulo}</Titulo>
            {texto && <p className={estilos.texto}>{texto}</p>}
            {acao && <div className={estilos.acao}>{acao}</div>}
        </div>
    );
}

export default EmptyState;
