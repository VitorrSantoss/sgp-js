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
import { excluirUsuarioPeloId, listarUsuarios } from "../../servicos/usuarios";
import { STATUS_USUARIO, opcoesDe } from "../../utils/rotulos";
import { casaBusca } from "../../utils/texto";

const COLUNAS = [
    { id: "nome", rotulo: "Nome", valor: (u) => u.nome, principal: true },
    { id: "cpf", rotulo: "CPF", valor: (u) => <span className="num">{u.cpf}</span> },
    { id: "email", rotulo: "E-mail", valor: (u) => u.email, larguraMinima: "14rem" },
    { id: "idade", rotulo: "Idade", valor: (u) => u.idade && <span className="num">{u.idade}</span> },
    { id: "status", rotulo: "Status", valor: (u) => <Badge valor={u.status} mapa={STATUS_USUARIO} /> },
];

function Usuarios() {
    const { itens, setItens, estado, recarregar } = useLista(listarUsuarios);
    const [busca, setBusca] = useState("");
    const [status, setStatus] = useState("");

    const exclusao = useExclusao(
        excluirUsuarioPeloId,
        (id) => setItens((lista) => lista.filter((u) => u.id !== id)),
        "Usuário excluído."
    );

    const vazia = estado === "pronto" && itens.length === 0;
    const filtrando = busca !== "" || status !== "";
    const visiveis = itens.filter((u) =>
        casaBusca(busca, u.nome, u.email, u.cpf) && (status === "" || u.status === status)
    );
    const limpar = () => {
        setBusca("");
        setStatus("");
    };

    const novo = <Botao para="/novo-usuario" icone={Plus} texto="Novo usuário" />;

    return (
        <>
            <PaginaTopo titulo="Usuários" descricao="Pessoas com acesso ao sistema." acao={!vazia && novo} />

            {estado === "pronto" && !vazia && (
                <BarraFiltros visiveis={visiveis.length} total={itens.length} filtrando={filtrando} aoLimpar={limpar}>
                    <Input
                        id="busca"
                        rotulo="Buscar"
                        type="search"
                        placeholder="Nome, e-mail ou CPF"
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
                        {opcoesDe(STATUS_USUARIO)}
                    </Input>
                </BarraFiltros>
            )}

            <TabelaDados
                rotulo="Usuários"
                colunas={COLUNAS}
                itens={visiveis}
                estado={estado}
                aoRecarregar={recarregar}
                filtrando={filtrando}
                aoLimpar={limpar}
                vazio={
                    <EmptyState
                        robo
                        titulo="Nenhum usuário cadastrado"
                        texto="Cadastre o primeiro usuário para atribuir projetos e tarefas."
                        acao={novo}
                    />
                }
                acoes={(usuario) => (
                    <>
                        <BotaoIcone icone={PencilSimple} rotulo={`Editar ${usuario.nome}`} para={`/usuario/${usuario.id}`} />
                        <BotaoIcone icone={Trash} perigo rotulo={`Excluir ${usuario.nome}`} aoClicar={() => exclusao.pedir(usuario)} />
                    </>
                )}
            />

            {exclusao.alvo && (
                <Modal
                    destrutivo
                    titulo="Confirmação de exclusão"
                    texto={`Tem certeza que deseja excluir o usuário ${exclusao.alvo.nome}? Esta ação não pode ser desfeita.`}
                    txtBtn01="Sim, excluir"
                    onClickBtn01={exclusao.confirmar}
                    txtBtn02="Cancelar"
                    onClickBtn02={exclusao.cancelar}
                />
            )}
        </>
    );
}

export default Usuarios;
