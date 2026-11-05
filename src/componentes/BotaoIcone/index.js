import { Link } from "react-router-dom";
import estilos from "./BotaoIcone.module.css";

function BotaoIcone({ icone: Icone, rotulo, aoClicar, para, perigo = false }) {
    const classe = `${estilos.botao} ${perigo ? estilos.perigo : ""}`;
    const miolo = <Icone size={20} aria-hidden="true" />;

    if (para) {
        return <Link to={para} className={classe} aria-label={rotulo} title={rotulo}>{miolo}</Link>;
    }

    return (
        <button type="button" className={classe} onClick={aoClicar} aria-label={rotulo} title={rotulo}>
            {miolo}
        </button>
    );
}

export default BotaoIcone;
