import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "@phosphor-icons/react";
import Botao from "../Botao";
import BotaoIcone from "../BotaoIcone";
import { useFocoPreso } from "../../hooks/useFocoPreso";
import estilos from "./Modal.module.css";

function Modal({
    titulo,
    texto,
    txtBtn01,
    onClickBtn01,
    txtBtn02,
    onClickBtn02,
    onClickBtnClose,
    destrutivo = false,
}) {
    const painel = useRef(null);
    const idTitulo = useId();
    const idTexto = useId();
    const [enviando, setEnviando] = useState(false);

    const cancelar = onClickBtnClose ?? onClickBtn02;

    // Vem antes de useFocoPreso: o inert precisa sair antes de o foco voltar à página.
    useEffect(() => {
        const raiz = document.getElementById("root");
        const rolagem = document.body.style.overflow;

        raiz.inert = true;
        document.body.style.overflow = "hidden";

        return () => {
            raiz.inert = false;
            document.body.style.overflow = rolagem;
        };
    }, []);

    useFocoPreso(painel, true, () => {
        if (!enviando) (cancelar ?? onClickBtn01)?.();
    });

    const confirmar = async () => {
        setEnviando(true);
        await onClickBtn01();
        setEnviando(false);
    };

    return createPortal(
        <div
            className={estilos.fundo}
            onMouseDown={(e) => {
                if (e.target === e.currentTarget && !enviando) cancelar?.();
            }}
        >
            <div
                ref={painel}
                className={estilos.painel}
                role="dialog"
                aria-modal="true"
                aria-labelledby={idTitulo}
                aria-describedby={idTexto}
                tabIndex={-1}
            >
                <div className={estilos.topo}>
                    <h2 id={idTitulo} className={estilos.titulo}>{titulo}</h2>
                    {onClickBtnClose && <BotaoIcone icone={X} rotulo="Fechar" aoClicar={onClickBtnClose} />}
                </div>

                <p id={idTexto} className={estilos.texto}>{texto}</p>

                {/* Em ação destrutiva o foco nasce em "Cancelar": Enter não apaga por engano. */}
                <div className={estilos.acoes}>
                    {onClickBtn02 && (
                        <Botao
                            cor="secondary"
                            texto={txtBtn02}
                            aoClicar={onClickBtn02}
                            desabilitado={enviando}
                            focoInicial={destrutivo}
                        />
                    )}
                    {onClickBtn01 && (
                        <Botao
                            cor={destrutivo ? "danger" : "primary"}
                            texto={txtBtn01}
                            aoClicar={confirmar}
                            carregando={enviando}
                            focoInicial={!destrutivo}
                        />
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
}

export default Modal;
