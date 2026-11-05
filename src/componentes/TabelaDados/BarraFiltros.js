import Botao from "../Botao";
import estilos from "./BarraFiltros.module.css";

function BarraFiltros({ visiveis, total, filtrando, aoLimpar, children }) {
    return (
        <div className={estilos.barra} role="search">
            <div className={estilos.campos}>{children}</div>
            <div className={estilos.resumo}>
                <p role="status" className="num">
                    {filtrando ? `${visiveis} de ${total} registros` : `${total} registros`}
                </p>
                {filtrando && <Botao cor="ghost" tamanho="sm" texto="Limpar filtros" aoClicar={aoLimpar} />}
            </div>
        </div>
    );
}

export default BarraFiltros;
