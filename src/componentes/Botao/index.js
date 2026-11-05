import { Link } from "react-router-dom";
import { CircleNotch } from "@phosphor-icons/react";
import estilos from "./Botao.module.css";

function Botao({
    cor = "primary",
    tamanho = "md",
    aoClicar,
    texto,
    icone: Icone,
    tipo = "button",
    para,
    carregando = false,
    desabilitado = false,
    focoInicial = false,
}) {
    const classes = `${estilos.botao} ${estilos[cor]} ${estilos[tamanho]}`;
    const miolo = (
        <>
            {carregando
                ? <CircleNotch size={18} className={estilos.giro} aria-hidden="true" />
                : Icone && <Icone size={18} aria-hidden="true" />}
            {texto}
        </>
    );

    if (para) return <Link to={para} className={classes}>{miolo}</Link>;

    return (
        <button
            type={tipo}
            className={classes}
            onClick={aoClicar}
            disabled={desabilitado || carregando}
            aria-busy={carregando || undefined}
            data-foco-inicial={focoInicial || undefined}
        >
            {miolo}
        </button>
    );
}

export default Botao;
