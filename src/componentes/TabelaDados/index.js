import { MagnifyingGlass, WarningCircle } from "@phosphor-icons/react";
import Botao from "../Botao";
import EmptyState from "../EmptyState";
import Skeleton, { Carregando } from "../Skeleton";
import estilos from "./TabelaDados.module.css";

const Vazio = () => (
    <>
        <span aria-hidden="true">—</span>
        <span className="sr-only">Não informado</span>
    </>
);

// Tabela que vira cards pela largura do próprio container, não da janela.
// Os role explícitos preservam a semântica quando o CSS troca o display.
// colunas: [{ id, rotulo, valor(item), apoio(item), principal, larguraMinima }]
function TabelaDados({ rotulo, colunas, itens, estado, aoRecarregar, vazio, filtrando, aoLimpar, acoes }) {
    if (estado === "carregando") {
        return (
            <div className={estilos.quadro}>
                <Carregando rotulo={`Carregando ${rotulo.toLowerCase()}`}>
                    <div className={estilos.esqueleto}>
                        {[0, 1, 2, 3, 4].map((i) => <Skeleton key={i} altura="2.25rem" />)}
                    </div>
                </Carregando>
            </div>
        );
    }

    if (estado === "erro") {
        return (
            <div className={estilos.quadro}>
                <EmptyState
                    icone={WarningCircle}
                    titulo="Não foi possível carregar a lista"
                    texto="Verifique a conexão com o servidor e tente novamente."
                    acao={<Botao cor="secondary" texto="Tentar novamente" aoClicar={aoRecarregar} />}
                />
            </div>
        );
    }

    if (itens.length === 0) {
        return (
            <div className={estilos.quadro}>
                {filtrando ? (
                    <EmptyState
                        icone={MagnifyingGlass}
                        titulo="Nenhum resultado"
                        texto="Nenhum registro corresponde à busca e aos filtros."
                        acao={<Botao cor="secondary" texto="Limpar filtros" aoClicar={aoLimpar} />}
                    />
                ) : vazio}
            </div>
        );
    }

    return (
        <div className={estilos.container}>
            <div className={estilos.moldura}>
                <table role="table" aria-label={rotulo} className={estilos.tabela}>
                    <thead>
                        <tr role="row">
                            {colunas.map((coluna) => (
                                <th key={coluna.id} role="columnheader" scope="col">{coluna.rotulo}</th>
                            ))}
                            {acoes && <th role="columnheader" scope="col">Opções</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {itens.map((item) => (
                            <tr key={item.id} role="row">
                                {colunas.map((coluna) => {
                                    const Celula = coluna.principal ? "th" : "td";
                                    const apoio = coluna.apoio?.(item);

                                    return (
                                        <Celula
                                            key={coluna.id}
                                            role={coluna.principal ? "rowheader" : "cell"}
                                            scope={coluna.principal ? "row" : undefined}
                                            className={coluna.principal ? estilos.principal : undefined}
                                            data-rotulo={coluna.principal ? undefined : coluna.rotulo}
                                            style={coluna.larguraMinima ? { minWidth: coluna.larguraMinima } : undefined}
                                        >
                                            <span>{coluna.valor(item) || <Vazio />}</span>
                                            {apoio && <span className={estilos.apoio}>{apoio}</span>}
                                        </Celula>
                                    );
                                })}
                                {acoes && (
                                    <td role="cell" className={estilos.acoes}>
                                        <div>{acoes(item)}</div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TabelaDados;
