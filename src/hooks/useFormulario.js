import { useState } from "react";
import { useToast } from "../componentes/Toast";

// Validação no blur e no envio, foco no primeiro campo inválido e estado de envio.
// `regras`: { idDoCampo: (valor) => mensagem ou "" }.
// `salvar(sinalizar)`: `sinalizar` ocupa o lugar de setExibirModal nos serviços e só
// é chamado quando a API confirma.
export function useFormulario({ regras, valores, salvar, mensagem, aoConcluir }) {
    const toast = useToast();
    const [tocados, setTocados] = useState({});
    const [enviando, setEnviando] = useState(false);
    const [falhou, setFalhou] = useState(false);

    const problema = (id) => regras[id]?.(valores[id]) || "";
    const erro = (id) => (tocados[id] ? problema(id) : "");

    const enviar = async (e) => {
        e.preventDefault();

        const ids = Object.keys(regras);
        setTocados(Object.fromEntries(ids.map((id) => [id, true])));

        const invalido = ids.find((id) => problema(id));
        if (invalido) {
            document.getElementById(invalido)?.focus();
            return;
        }

        let salvou = false;
        setEnviando(true);
        setFalhou(false);

        await salvar(() => {
            salvou = true;
        });

        setEnviando(false);

        if (salvou) {
            if (mensagem) toast.sucesso(mensagem);
            aoConcluir();
        } else {
            setFalhou(true);
        }
    };

    // Props comuns de um <Input> obrigatório.
    const campo = (id) => ({
        id,
        erro: erro(id),
        obrigatorio: true,
        onBlur: () => setTocados((atual) => ({ ...atual, [id]: true })),
    });

    return { campo, enviar, enviando, falhou };
}

export const exigir = (mensagem) => (valor) =>
    String(valor ?? "").trim() === "" ? mensagem : "";

export function validarEmail(valor) {
    const email = String(valor ?? "").trim();
    if (email === "") return "Informe o e-mail.";
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? ""
        : "Use um e-mail válido, como nome@exemplo.com.br.";
}

export function validarCpf(valor) {
    const cpf = String(valor ?? "").trim();
    if (cpf === "") return "Informe o CPF.";
    return /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/.test(cpf)
        ? ""
        : "Use 11 dígitos, no formato 000.000.000-00.";
}
