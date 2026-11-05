import { useState } from "react";
import { PencilSimple, Plus, Trash } from "@phosphor-icons/react";
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
import { excluirProjetoPeloId, listarProjetos } from "../../servicos/projetos";
import { casaBusca } from "../../utils/texto";

const COLUNAS = [
    { id: "nome", rotulo: "Nome", valor: (p) => p.nome, principal: true },
    { id: "descricao", rotulo: "Descrição", valor: (p) => p.descricao },
    { id: "responsavel", rotulo: "Responsável", valor: (p) => p.responsavel?.nome },
];

function Projetos() {
    const { itens, setItens, estado, recarregar } = useLista(listarProjetos);
    const [busca, setBusca] = useState("");

    const exclusao = useExclusao(
        excluirProjetoPeloId,
        (id) => setItens((lista) => lista.filter((p) => p.id !== id)),
        "Projeto excluído."
    );

    const vazia = estado === "pronto" && itens.length === 0;
    const filtrando = busca !== "";
    const visiveis = itens.filter((p) => casaBusca(busca, p.nome, p.descricao, p.responsavel?.nome));
    const limpar = () => setBusca("");

    const novo = <Botao para="/novo-projeto" icone={Plus} texto="Novo projeto" />;

    return (
        <>
            <PaginaTopo titulo="Projetos" descricao="Projetos em andamento e seus responsáveis." acao={!vazia && novo} />

            {estado === "pronto" && !vazia && (
                <BarraFiltros visiveis={visiveis.length} total={itens.length} filtrando={filtrando} aoLimpar={limpar}>
                    <Input
                        id="busca"
                        rotulo="Buscar"
                        type="search"
                        placeholder="Nome, descrição ou responsável"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                    />
                </BarraFiltros>
            )}

            <TabelaDados
                rotulo="Projetos"
                colunas={COLUNAS}
                itens={visiveis}
                estado={estado}
                aoRecarregar={recarregar}
                filtrando={filtrando}
                aoLimpar={limpar}
                vazio={
                    <EmptyState
                        robo
                        titulo="Nenhum projeto cadastrado"
                        texto="Crie o primeiro projeto para organizar as tarefas da equipe."
                        acao={novo}
                    />
                }
                acoes={(projeto) => (
                    <>
                        <BotaoIcone icone={PencilSimple} rotulo={`Editar ${projeto.nome}`} para={`/projeto/${projeto.id}`} />
                        <BotaoIcone icone={Trash} perigo rotulo={`Excluir ${projeto.nome}`} aoClicar={() => exclusao.pedir(projeto)} />
                    </>
                )}
            />

            {exclusao.alvo && (
                <Modal
                    destrutivo
                    titulo="Confirmação de exclusão"
                    texto={`Tem certeza que deseja excluir o projeto ${exclusao.alvo.nome}? Esta ação não pode ser desfeita.`}
                    txtBtn01="Sim, excluir"
                    onClickBtn01={exclusao.confirmar}
                    txtBtn02="Cancelar"
                    onClickBtn02={exclusao.cancelar}
                />
            )}
        </>
    );
}

export default Projetos;
