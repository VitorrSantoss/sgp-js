import { useState } from "react";
import { useToast } from "../componentes/Toast";

// `excluir` é um serviço excluir*PeloId(id, setExibirModal): ele só chama o
// segundo argumento quando a API confirma, então é esse o sinal de sucesso.
export function useExclusao(excluir, aoExcluir, mensagem) {
    const toast = useToast();
    const [alvo, setAlvo] = useState(null);

    const confirmar = async () => {
        let excluiu = false;

        await excluir(alvo.id, () => {
            excluiu = true;
        });

        setAlvo(null);

        if (excluiu) {
            aoExcluir(alvo.id);
            toast.sucesso(mensagem);
        }
    };

    return { alvo, pedir: setAlvo, cancelar: () => setAlvo(null), confirmar };
}
