import { useCallback, useEffect, useState } from "react";

// Os serviços engolem o erro e só chamam os setters em caso de sucesso. `carregar`
// recebe `marcar`, chamado por um setter: se a promessa acaba sem ele, a carga falhou.
export function useCarga(carregar, habilitado = true) {
    const [estado, setEstado] = useState(habilitado ? "carregando" : "pronto");
    const [tentativa, setTentativa] = useState(0);

    useEffect(() => {
        if (!habilitado) return undefined;

        let vigente = true;
        let sucesso = false;

        setEstado("carregando");
        carregar(() => {
            sucesso = true;
        }).then(() => {
            if (vigente) setEstado(sucesso ? "pronto" : "erro");
        });

        return () => {
            vigente = false;
        };
    }, [carregar, habilitado, tentativa]);

    const recarregar = useCallback(() => setTentativa((t) => t + 1), []);

    return { estado, recarregar };
}

export function useLista(listar) {
    const [itens, setItens] = useState([]);

    const carregar = useCallback((marcar) => listar((dados) => {
        marcar();
        setItens(dados ?? []);
    }), [listar]);

    return { itens, setItens, ...useCarga(carregar) };
}
