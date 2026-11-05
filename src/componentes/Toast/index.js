import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CheckCircle, WarningCircle, X } from "@phosphor-icons/react";
import estilos from "./Toast.module.css";

const DURACAO = { sucesso: 5000, erro: 8000 };

const ToastContext = createContext(null);

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }) {
    const [avisos, setAvisos] = useState([]);
    const proximoId = useRef(0);

    const remover = useCallback((id) => {
        setAvisos((atual) => atual.filter((aviso) => aviso.id !== id));
    }, []);

    const mostrar = useCallback((tipo, mensagem) => {
        const id = ++proximoId.current;

        // Vários serviços podem falhar juntos com a mesma mensagem.
        setAvisos((atual) => (
            atual.some((aviso) => aviso.mensagem === mensagem) ? atual : [...atual, { id, tipo, mensagem }]
        ));
        setTimeout(() => remover(id), DURACAO[tipo]);
    }, [remover]);

    // src/servicos reporta falhas com alert() e não pode mudar: enquanto o app
    // está montado, essas mensagens viram toast no lugar do diálogo nativo.
    useEffect(() => {
        const nativo = window.alert;
        window.alert = (mensagem) => mostrar("erro", String(mensagem));

        return () => {
            window.alert = nativo;
        };
    }, [mostrar]);

    const valor = useMemo(() => ({ sucesso: (mensagem) => mostrar("sucesso", mensagem) }), [mostrar]);

    const listar = (tipo) => avisos
        .filter((aviso) => aviso.tipo === tipo)
        .map((aviso) => <Aviso key={aviso.id} {...aviso} aoFechar={remover} />);

    return (
        <ToastContext.Provider value={valor}>
            {children}
            {createPortal(
                <div className={estilos.area}>
                    <div role="status" className={estilos.regiao}>{listar("sucesso")}</div>
                    <div role="alert" className={estilos.regiao}>{listar("erro")}</div>
                </div>,
                document.body
            )}
        </ToastContext.Provider>
    );
}

function Aviso({ id, tipo, mensagem, aoFechar }) {
    const Icone = tipo === "erro" ? WarningCircle : CheckCircle;

    return (
        <div className={`${estilos.aviso} ${estilos[tipo]}`}>
            <Icone size={20} weight="fill" className={estilos.icone} aria-hidden="true" />
            <p className={estilos.mensagem}>{mensagem}</p>
            <button type="button" className={estilos.fechar} onClick={() => aoFechar(id)} aria-label="Dispensar aviso">
                <X size={16} aria-hidden="true" />
            </button>
        </div>
    );
}
