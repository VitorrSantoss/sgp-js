import { Bar, Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { ChartBar, Users, WarningCircle } from "@phosphor-icons/react";
import Botao from "../../componentes/Botao";
import EmptyState from "../../componentes/EmptyState";
import PaginaTopo from "../../componentes/PaginaTopo";
import Skeleton, { Carregando } from "../../componentes/Skeleton";
import { useLista } from "../../hooks/useCarga";
import { useMidia } from "../../hooks/useMidia";
import { listarProjetos } from "../../servicos/projetos";
import { listarTarefas } from "../../servicos/tarefas";
import { listarUsuarios } from "../../servicos/usuarios";
import { hachura, opcoesBarras, opcoesRosca, quebrarRotulo, token } from "../../utils/grafico";
import { PRIORIDADE, STATUS_TAREFA, STATUS_USUARIO } from "../../utils/rotulos";
import estilos from "./Dashboard.module.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const contarPorProjeto = (projetos, tarefas, campo, valor) =>
    projetos.map((projeto) =>
        tarefas.filter((tarefa) => tarefa[campo] === valor && tarefa.projeto.id === projeto.id).length
    );

const porcentagem = (parte, total) => (total > 0 ? Math.round((parte / total) * 100) : 0);

function serie(rotulo, data, backgroundColor) {
    return {
        label: rotulo,
        data,
        backgroundColor,
        borderColor: token("--grafico-contorno"),
        borderWidth: 1,
        maxBarThickness: 28,
    };
}

// Uma frase por projeto, lida no lugar do canvas pelo leitor de tela.
function resumir(projetos, series) {
    return projetos
        .map((projeto, i) => {
            const partes = series.map((s) => `${s.data[i]} ${s.label.toLowerCase()}`);
            return `${projeto.nome}: ${partes.join(", ")}.`;
        })
        .join(" ");
}

function Kpi({ rotulo, valor, detalhe, progresso }) {
    return (
        <div className={estilos.kpi}>
            <dt>{rotulo}</dt>
            <dd className={`${estilos.kpiValor} num`}>{valor}</dd>
            <dd className={estilos.kpiDetalhe}>{detalhe}</dd>
            {progresso !== undefined && (
                <dd className={estilos.trilho} aria-hidden="true">
                    <span style={{ width: `${progresso}%` }} />
                </dd>
            )}
        </div>
    );
}

function Cartao({ id, titulo, resumo, classe = "", children }) {
    return (
        <section className={`${estilos.cartao} ${classe}`} aria-labelledby={`${id}-titulo`}>
            <h2 id={`${id}-titulo`} className={estilos.cartaoTitulo}>{titulo}</h2>
            <p id={`${id}-resumo`} className="sr-only">{resumo}</p>
            {children}
        </section>
    );
}

function Dashboard() {
    const usuarios = useLista(listarUsuarios);
    const projetos = useLista(listarProjetos);
    const tarefas = useLista(listarTarefas);
    const telaEstreita = useMidia("(max-width: 35.99rem)");

    const cargas = [usuarios, projetos, tarefas];

    const topo = <PaginaTopo titulo="Dashboard" descricao="Visão geral de usuários, projetos e tarefas." />;

    if (cargas.some((carga) => carga.estado === "carregando")) {
        return (
            <>
                {topo}
                <Carregando rotulo="Carregando indicadores">
                    <div className={estilos.faixaEspera}><Skeleton altura="5rem" /></div>
                    <div className={estilos.grade}>
                        <div className={`${estilos.cartao} ${estilos.largo}`}><Skeleton altura="20rem" /></div>
                        <div className={estilos.cartao}><Skeleton altura="20rem" /></div>
                    </div>
                </Carregando>
            </>
        );
    }

    if (cargas.some((carga) => carga.estado === "erro")) {
        const tentarDeNovo = () => cargas.forEach((carga) => carga.estado === "erro" && carga.recarregar());

        return (
            <>
                {topo}
                <div className={estilos.cartao}>
                    <EmptyState
                        icone={WarningCircle}
                        titulo="Não foi possível carregar o dashboard"
                        texto="Verifique a conexão com o servidor e tente novamente."
                        acao={<Botao cor="secondary" texto="Tentar novamente" aoClicar={tentarDeNovo} />}
                    />
                </div>
            </>
        );
    }

    const listaUsuarios = usuarios.itens;
    const listaProjetos = projetos.itens;
    const listaTarefas = tarefas.itens;

    const ativos = listaUsuarios.filter((usuario) => usuario.status === "ATIVO").length;
    const inativos = listaUsuarios.filter((usuario) => usuario.status === "INATIVO").length;
    const finalizadas = listaTarefas.filter((tarefa) => tarefa.status === "FINALIZADA").length;
    const emAndamento = listaTarefas.filter((tarefa) => tarefa.status === "FAZENDO").length;
    const taxa = porcentagem(finalizadas, listaTarefas.length);

    const temTarefas = listaProjetos.length > 0 && listaTarefas.length > 0;
    const labels = listaProjetos.map((projeto) => quebrarRotulo(projeto.nome, telaEstreita ? 11 : 18));

    const seriePorProjeto = (mapa, campo, valor, cor) =>
        serie(mapa[valor].rotulo, contarPorProjeto(listaProjetos, listaTarefas, campo, valor), cor);

    const seriesStatus = [
        seriePorProjeto(STATUS_TAREFA, "status", "PENDENTE", token("--grafico-pendente")),
        seriePorProjeto(STATUS_TAREFA, "status", "FAZENDO", token("--grafico-fazendo")),
        seriePorProjeto(STATUS_TAREFA, "status", "FINALIZADA", token("--grafico-finalizada")),
    ];

    const seriesPrioridade = [
        seriePorProjeto(PRIORIDADE, "prioridade", "ALTA", token("--grafico-alta")),
        seriePorProjeto(PRIORIDADE, "prioridade", "MEDIA", hachura(token("--grafico-media"), token("--grafico-contorno"))),
        seriePorProjeto(PRIORIDADE, "prioridade", "BAIXA", token("--grafico-baixa")),
    ];

    const dadosUsuarios = {
        labels: [STATUS_USUARIO.ATIVO.rotulo, STATUS_USUARIO.INATIVO.rotulo],
        datasets: [{
            label: "Usuários",
            data: [ativos, inativos],
            backgroundColor: [token("--grafico-ativo"), token("--grafico-inativo")],
            borderColor: token("--grafico-fatia-borda"),
            borderWidth: 2,
        }],
    };

    const legenda = [
        { rotulo: STATUS_USUARIO.ATIVO.rotulo, valor: ativos, classe: estilos.corAtivo },
        { rotulo: STATUS_USUARIO.INATIVO.rotulo, valor: inativos, classe: estilos.corInativo },
    ];

    const semTarefas = (
        <EmptyState
            nivel="h3"
            icone={ChartBar}
            titulo="Ainda não há tarefas para exibir"
            texto="O gráfico aparece quando houver tarefas ligadas a projetos."
        />
    );

    return (
        <>
            {topo}

            <dl className={estilos.faixa}>
                <Kpi rotulo="Usuários" valor={listaUsuarios.length} detalhe={`${ativos} ativos`} />
                <Kpi rotulo="Projetos" valor={listaProjetos.length} detalhe="cadastrados" />
                <Kpi rotulo="Tarefas" valor={listaTarefas.length} detalhe={`${emAndamento} em andamento`} />
                <Kpi
                    rotulo="Finalizadas"
                    valor={`${taxa}%`}
                    detalhe={`${finalizadas} de ${listaTarefas.length} tarefas`}
                    progresso={taxa}
                />
            </dl>

            <div className={estilos.grade}>
                <Cartao
                    id="status"
                    titulo="Status das tarefas por projeto"
                    resumo={resumir(listaProjetos, seriesStatus)}
                    classe={estilos.largo}
                >
                    {temTarefas ? (
                        <div className={estilos.area}>
                            <Bar
                                data={{ labels, datasets: seriesStatus }}
                                options={opcoesBarras()}
                                aria-label="Gráfico de barras"
                                aria-describedby="status-resumo"
                            />
                        </div>
                    ) : semTarefas}
                </Cartao>

                <Cartao
                    id="usuarios"
                    titulo="Status dos usuários"
                    resumo={`${ativos} usuários ativos e ${inativos} inativos.`}
                >
                    {listaUsuarios.length > 0 ? (
                        <div className={estilos.rosca}>
                            <div className={estilos.areaRosca}>
                                <Doughnut
                                    data={dadosUsuarios}
                                    options={opcoesRosca()}
                                    aria-label="Gráfico de rosca"
                                    aria-describedby="usuarios-resumo"
                                />
                                <p className={estilos.total} aria-hidden="true">
                                    <strong className="num">{porcentagem(ativos, listaUsuarios.length)}%</strong>
                                    ativos
                                </p>
                            </div>
                            <ul className={estilos.legenda} aria-hidden="true">
                                {legenda.map(({ rotulo, valor, classe }) => (
                                    <li key={rotulo}>
                                        <span className={`${estilos.amostra} ${classe}`} />
                                        {rotulo}
                                        <strong className="num">{valor}</strong>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <EmptyState nivel="h3" icone={Users} titulo="Nenhum usuário cadastrado" />
                    )}
                </Cartao>

                <Cartao
                    id="prioridade"
                    titulo="Prioridade das tarefas por projeto"
                    resumo={resumir(listaProjetos, seriesPrioridade)}
                    classe={estilos.inteiro}
                >
                    {temTarefas ? (
                        <div className={estilos.areaHorizontal} style={{ "--linhas": listaProjetos.length }}>
                            <Bar
                                data={{ labels, datasets: seriesPrioridade }}
                                options={opcoesBarras({ horizontal: true })}
                                aria-label="Gráfico de barras horizontais"
                                aria-describedby="prioridade-resumo"
                            />
                        </div>
                    ) : semTarefas}
                </Cartao>
            </div>
        </>
    );
}

export default Dashboard;
