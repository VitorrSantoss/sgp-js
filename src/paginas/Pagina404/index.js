import { useEffect } from "react";
import { House } from "@phosphor-icons/react";
import Botao from "../../componentes/Botao";
import EmptyState from "../../componentes/EmptyState";

function Pagina404() {
    useEffect(() => {
        document.title = "Página não encontrada | SGP";
    }, []);

    return (
        <EmptyState
            grande
            robo
            nivel="h1"
            titulo="Página não encontrada"
            texto="O endereço pode estar incorreto ou a página pode ter sido removida."
            acao={<Botao para="/dashboard" icone={House} texto="Voltar ao dashboard" />}
        />
    );
}

export default Pagina404;
