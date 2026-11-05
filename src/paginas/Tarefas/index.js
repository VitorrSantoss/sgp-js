import { useState } from "react";
import { PencilSimple, Plus, Trash } from "@phosphor-icons/react";
import Badge from "../../componentes/Badge";
import Botao from "../../componentes/Botao";
import BotaoIcone from "../../componentes/BotaoIcone";
import EmptyState from "../../componentes/EmptyState";
import Input from "../../componentes/Input";
import Modal from "../../componentes/Modal";
import PaginaTopo from "../../componentes/PaginaTopo";
import TabelaDados from "../../componentes/TabelaDados";
import BarraFiltros from "../../componentes/TabelaDados/BarraFiltros";
import { useLista } from "../../hooks/useCarga";
import { useExclusao } from "../../hooks/useExclusao";
import { excluirTarefaPeloId, listarTarefas } from "../../servicos/tarefas";
import { PRIORIDADE, STATUS_TAREFA, opcoesDe } from "../../utils/rotulos";
import { casaBusca } from "../../utils/texto";

// O projeto é a segunda linha do título: sete colunas não cabem em 1024px.
const COLUNAS = [
    { id: "titulo", rotulo: "Título e projeto", valor: (t) => t.titulo, apoio: (t) => t.projeto?.nome, principal: true },
    { id: "criacao", rotulo: "Criação", valor: (t) => <span className="num">{t.dataCriacao}</span> },
    { id: "conclusao", rotulo: "Conclusão", valor: (t) => t.dataConclusao && <span className="num">{t.dataConclusao}</span> },
    { id: "prioridade", rotulo: "Prioridade", valor: (t) => <Badge valor={t.prioridade} mapa={PRIORIDADE} /> },
    { id: "status", rotulo: "Status", valor: (t) => <Badge valor={t.status} mapa={STATUS_TAREFA} /> },
];

function Tarefas() {
    const { itens, setItens, estado, recarregar } = useLista(listarTarefas);
    const [busca, setBusca] = useState("");
    const [status, setStatus] = useState("");
    const [prioridade, setPrioridade] = useState("");

    const exclusao = useExclusao(
        excluirTarefaPeloId,
        (id) => setItens((lista) => lista.filter((t) => t.id !== id)),
        "Tarefa excluída."
    );

    const vazia = estado === "pronto" && itens.length === 0;
    const filtrando = busca !== "" || status !== "" || prioridade !== "";
    const visiveis = itens.filter((t) =>
        casaBusca(busca, t.titulo, t.projeto?.nome)
        && (status === "" || t.status === status)
        && (prioridade === "" || t.prioridade === prioridade)
    );
    const limpar = () => {
        setBusca("");
        setStatus("");
        setPrioridade("");
    };

    const nova = <Botao para="/nova-tarefa" icone={Plus} texto="Nova tarefa" />;

    return (
        <>
            <PaginaTopo titulo="Tarefas" descricao="O que a equipe precisa entregar." acao={!vazia && nova} />

            {estado === "pronto" && !vazia && (
                <BarraFiltros visiveis={visiveis.length} total={itens.length} filtrando={filtrando} aoLimpar={limpar}>
                    <Input
                        id="busca"
                        rotulo="Buscar"
                        type="search"
                        placeholder="Título ou projeto"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                    />
                    <Input
                        id="filtro-status"
                        rotulo="Status"
                        as="select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">Todos</option>
                        {opcoesDe(STATUS_TAREFA)}
                    </Input>
                    <Input
                        id="filtro-prioridade"
                        rotulo="Prioridade"
                        as="select"
                        value={prioridade}
                        onChange={(e) => setPrioridade(e.target.value)}
                    >
                        <option value="">Todas</option>
                        {opcoesDe(PRIORIDADE)}
                    </Input>
                </BarraFiltros>
            )}

            <TabelaDados
                rotulo="Tarefas"
                colunas={COLUNAS}
                itens={visiveis}
                estado={estado}
                aoRecarregar={recarregar}
                filtrando={filtrando}
                aoLimpar={limpar}
                vazio={
                    <EmptyState
                        robo
                        titulo="Nenhuma tarefa cadastrada"
                        texto="Crie a primeira tarefa e atribua a um responsável."
                        acao={nova}
                    />
                }
                acoes={(tarefa) => (
                    <>
                        <BotaoIcone icone={PencilSimple} rotulo={`Editar ${tarefa.titulo}`} para={`/tarefa/${tarefa.id}`} />
                        <BotaoIcone icone={Trash} perigo rotulo={`Excluir ${tarefa.titulo}`} aoClicar={() => exclusao.pedir(tarefa)} />
                    </>
                )}
            />

            {exclusao.alvo && (
                <Modal
                    destrutivo
                    titulo="Confirmação de exclusão"
                    texto={`Tem certeza que deseja excluir a tarefa ${exclusao.alvo.titulo}? Esta ação não pode ser desfeita.`}
                    txtBtn01="Sim, excluir"
                    onClickBtn01={exclusao.confirmar}
                    txtBtn02="Cancelar"
                    onClickBtn02={exclusao.cancelar}
                />
            )}
        </>
    );
}

export default Tarefas;
