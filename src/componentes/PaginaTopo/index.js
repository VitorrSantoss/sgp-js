import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";
import estilos from "./PaginaTopo.module.css";

function PaginaTopo({ titulo, descricao, acao, voltar }) {
    useEffect(() => {
        document.title = `${titulo} | SGP`;
    }, [titulo]);

    return (
        <header className={estilos.topo}>
            <div className={estilos.textos}>
                {voltar && (
                    <Link to={voltar.para} className={estilos.voltar}>
                        <ArrowLeft size={16} aria-hidden="true" />
                        {voltar.rotulo}
                    </Link>
                )}
                <h1 className={estilos.titulo}>{titulo}</h1>
                {descricao && <p className={estilos.descricao}>{descricao}</p>}
            </div>
            {acao}
        </header>
    );
}

export default PaginaTopo;
