import { useEffect, useRef } from "react";

const FOCAVEIS = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])';

// Enquanto `ativo`, o Tab circula dentro de `painel` e Esc chama `aoEscape`.
// Ao desativar, o foco volta a quem abriu; se esse elemento sumiu, vai para #conteudo.
export function useFocoPreso(painel, ativo, aoEscape) {
    const escape = useRef(aoEscape);

    useEffect(() => {
        escape.current = aoEscape;
    });

    useEffect(() => {
        if (!ativo) return undefined;

        const origem = document.activeElement;
        const raiz = painel.current;
        const focaveis = () => [...raiz.querySelectorAll(FOCAVEIS)];

        (raiz.querySelector("[data-foco-inicial]") ?? focaveis()[0] ?? raiz).focus();

        const aoTeclar = (e) => {
            if (e.key === "Escape") {
                escape.current?.();
            } else if (e.key === "Tab") {
                const lista = focaveis();
                const limite = lista[e.shiftKey ? 0 : lista.length - 1];

                if (document.activeElement === limite) {
                    e.preventDefault();
                    lista[e.shiftKey ? lista.length - 1 : 0].focus();
                }
            }
        };

        document.addEventListener("keydown", aoTeclar);

        return () => {
            document.removeEventListener("keydown", aoTeclar);
            (origem?.isConnected ? origem : document.getElementById("conteudo"))
                ?.focus({ preventScroll: true });
        };
    }, [painel, ativo]);
}
