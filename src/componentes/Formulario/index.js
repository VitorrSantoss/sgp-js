import { WarningCircle } from "@phosphor-icons/react";
import Alerta from "../Alerta";
import Botao from "../Botao";
import EmptyState from "../EmptyState";
import Skeleton, { Carregando } from "../Skeleton";
import estilos from "./Formulario.module.css";

// Moldura dos três formulários. `form` vem de useFormulario.
function Formulario({ estado, aoRecarregar, form, textoSalvar, aoCancelar, children }) {
    if (estado === "carregando") {
        return (
            <div className={estilos.cartao}>
                <Carregando rotulo="Carregando dados">
                    <div className={estilos.grade}>
                        {[0, 1, 2, 3].map((i) => <Skeleton key={i} altura="4.25rem" />)}
                    </div>
                </Carregando>
            </div>
        );
    }

    if (estado === "erro") {
        return (
            <div className={estilos.cartao}>
                <EmptyState
                    icone={WarningCircle}
                    titulo="Não foi possível carregar os dados"
                    texto="Verifique a conexão com o servidor e tente novamente."
                    acao={<Botao cor="secondary" texto="Tentar novamente" aoClicar={aoRecarregar} />}
                />
            </div>
        );
    }

    return (
        <form className={estilos.cartao} onSubmit={form.enviar} noValidate>
            {form.falhou && (
                <div className={estilos.aviso}>
                    <Alerta cor="danger" mensagem="Não foi possível salvar. Confira os dados e tente novamente." />
                </div>
            )}

            <p className={estilos.legenda}>Campos com * são obrigatórios.</p>

            <div className={estilos.grade}>{children}</div>

            <div className={estilos.acoes}>
                <Botao tipo="submit" texto={textoSalvar} carregando={form.enviando} />
                <Botao cor="secondary" texto="Cancelar" aoClicar={aoCancelar} desabilitado={form.enviando} />
            </div>
        </form>
    );
}

export default Formulario;
