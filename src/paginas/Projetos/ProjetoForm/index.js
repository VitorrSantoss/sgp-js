import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CheckSquare, PencilSimple, Plus, Trash } from "@phosphor-icons/react";
import Badge from "../../../componentes/Badge";
import Botao from "../../../componentes/Botao";
import BotaoIcone from "../../../componentes/BotaoIcone";
import EmptyState from "../../../componentes/EmptyState";
import Formulario from "../../../componentes/Formulario";
import Input from "../../../componentes/Input";
import Modal from "../../../componentes/Modal";
import PaginaTopo from "../../../componentes/PaginaTopo";
import TabelaDados from "../../../componentes/TabelaDados";
import { useCarga, useLista } from "../../../hooks/useCarga";
import { useExclusao } from "../../../hooks/useExclusao";
import { exigir, useFormulario } from "../../../hooks/useFormulario";
import { atualizarProjeto, obterProjetoPeloId, salvarProjeto } from "../../../servicos/projetos";
import { excluirTarefaPeloId } from "../../../servicos/tarefas";
import { listarUsuarios } from "../../../servicos/usuarios";
import { PRIORIDADE, STATUS_TAREFA } from "../../../utils/rotulos";
import estilos from "./ProjetoForm.module.css";

const REGRAS = {
    nome: exigir("Informe o nome do projeto."),
    responsavel: exigir("Escolha o responsável."),
    descricao: exigir("Descreva o projeto."),
};

const COLUNAS_TAREFAS = [
    { id: "titulo", rotulo: "Título", valor: (t) => t.titulo, principal: true },
    { id: "prioridade", rotulo: "Prioridade", valor: (t) => <Badge valor={t.prioridade} mapa={PRIORIDADE} /> },
    { id: "status", rotulo: "Status", valor: (t) => <Badge valor={t.status} mapa={STATUS_TAREFA} /> },
    { id: "usuario", rotulo: "Atribuído para", valor: (t) => t.usuario?.nome },
];

function ProjetoForm() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [responsavelId, setResponsavelId] = useState("");
    const [tarefas, setTarefas] = useState([]);
    const usuarios = useLista(listarUsuarios);

    const carregar = useCallback((marcar) => obterProjetoPeloId(
        id,
        (valor) => { marcar(); setNome(valor ?? ""); },
        (valor) => setDescricao(valor ?? ""),
        (valor) => setResponsavelId(valor ?? ""),
        (valor) => setTarefas(valor ?? [])
    ), [id]);

    const carga = useCarga(carregar, Boolean(id));
    const voltar = () => navigate("/projetos");

    const form = useFormulario({
        regras: REGRAS,
        valores: { nome, descricao, responsavel: responsavelId },
        mensagem: `Projeto ${id ? "atualizado" : "cadastrado"} com sucesso!`,
        aoConcluir: voltar,
        salvar: async (sinalizar) => {
            const dadosProjeto = {
                nome,
                descricao,
                responsavel: {
                    id: responsavelId
                }
            };

            console.log(dadosProjeto);

            if (id) {
                await atualizarProjeto(id, dadosProjeto, sinalizar);
            } else {
                await salvarProjeto(dadosProjeto, sinalizar);
            }
        },
    });

    const exclusao = useExclusao(
        excluirTarefaPeloId,
        (idTarefa) => setTarefas((lista) => lista.filter((t) => t.id !== idTarefa)),
        "Tarefa excluída."
    );

    const campoResponsavel = form.campo("responsavel");

    return (
        <>
            <PaginaTopo
                titulo={id ? "Editar projeto" : "Novo projeto"}
                voltar={{ para: "/projetos", rotulo: "Projetos" }}
            />

            <Formulario
                estado={carga.estado}
                aoRecarregar={carga.recarregar}
                form={form}
                textoSalvar="Salvar projeto"
                aoCancelar={voltar}
            >
                <Input
                    {...form.campo("nome")}
                    rotulo="Nome"
                    placeholder="Digite o nome do projeto"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <Input
                    {...campoResponsavel}
                    rotulo="Responsável"
                    as="select"
                    value={responsavelId}
                    onChange={(e) => setResponsavelId(e.target.value)}
                    erro={campoResponsavel.erro
                        || (usuarios.estado === "erro" ? "Não foi possível carregar os usuários." : "")}
                >
                    <option disabled value="">
                        {usuarios.estado === "carregando" ? "Carregando..." : "Escolha um usuário..."}
                    </option>
                    {usuarios.itens.map((usuario) => (
                        <option key={usuario.id} value={usuario.id}>{usuario.nome}</option>
                    ))}
                </Input>
                <Input
                    {...form.campo("descricao")}
                    rotulo="Descrição"
                    as="textarea"
                    rows={5}
                    larga
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                />
            </Formulario>

            <section className={estilos.tarefas} aria-labelledby="titulo-tarefas">
                <div className={estilos.topo}>
                    <h2 id="titulo-tarefas" className={estilos.titulo}>Tarefas associadas</h2>
                    <Botao para="/nova-tarefa" cor="secondary" icone={Plus} texto="Nova tarefa" />
                </div>

                <TabelaDados
                    rotulo="Tarefas associadas"
                    colunas={COLUNAS_TAREFAS}
                    itens={tarefas}
                    estado={carga.estado}
                    aoRecarregar={carga.recarregar}
                    vazio={
                        <EmptyState
                            nivel="h3"
                            icone={CheckSquare}
                            titulo="Nenhuma tarefa associada"
                            texto="As tarefas ligadas a este projeto aparecem aqui."
                        />
                    }
                    acoes={(tarefa) => (
                        <>
                            <BotaoIcone icone={PencilSimple} rotulo={`Editar ${tarefa.titulo}`} para={`/tarefa/${tarefa.id}`} />
                            <BotaoIcone icone={Trash} perigo rotulo={`Excluir ${tarefa.titulo}`} aoClicar={() => exclusao.pedir(tarefa)} />
                        </>
                    )}
                />
            </section>

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

export default ProjetoForm;
