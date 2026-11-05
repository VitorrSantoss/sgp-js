import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Formulario from "../../../componentes/Formulario";
import Input from "../../../componentes/Input";
import PaginaTopo from "../../../componentes/PaginaTopo";
import { useCarga, useLista } from "../../../hooks/useCarga";
import { exigir, useFormulario } from "../../../hooks/useFormulario";
import { listarProjetos } from "../../../servicos/projetos";
import { atualizarTarefa, obterTarefaPeloId, salvarTarefa } from "../../../servicos/tarefas";
import { listarUsuarios } from "../../../servicos/usuarios";
import { PRIORIDADE, STATUS_TAREFA, opcoesDe } from "../../../utils/rotulos";

const REGRAS = {
    titulo: exigir("Informe o título da tarefa."),
    dataCriacao: exigir("Informe a data de criação."),
    usuario: exigir("Escolha quem vai executar a tarefa."),
    projeto: exigir("Escolha o projeto."),
    prioridade: exigir("Escolha a prioridade."),
    status: exigir("Escolha o status."),
};

function primeiraOpcao(lista) {
    return (
        <option disabled value="">
            {lista.estado === "carregando" ? "Carregando..." : "Escolha uma opção..."}
        </option>
    );
}

function TarefaForm() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [titulo, setTitulo] = useState("");
    const [dataCriacao, setDataCriacao] = useState("");
    const [dataConclusao, setDataConclusao] = useState("");
    const [prioridade, setPrioridade] = useState("");
    const [status, setStatus] = useState("");
    const [projetoId, setProjetoId] = useState("");
    const [usuarioId, setUsuarioId] = useState("");
    const projetos = useLista(listarProjetos);
    const usuarios = useLista(listarUsuarios);

    const carregar = useCallback((marcar) => obterTarefaPeloId(
        id,
        (valor) => { marcar(); setTitulo(valor ?? ""); },
        (valor) => setDataCriacao(valor ?? ""),
        (valor) => setDataConclusao(valor ?? ""),
        (valor) => setUsuarioId(valor ?? ""),
        (valor) => setPrioridade(valor ?? ""),
        (valor) => setStatus(valor ?? ""),
        (valor) => setProjetoId(valor ?? "")
    ), [id]);

    const carga = useCarga(carregar, Boolean(id));
    const voltar = () => navigate("/tarefas");

    const form = useFormulario({
        regras: REGRAS,
        valores: { titulo, dataCriacao, usuario: usuarioId, projeto: projetoId, prioridade, status },
        mensagem: `Tarefa ${id ? "atualizada" : "cadastrada"} com sucesso!`,
        aoConcluir: voltar,
        salvar: async (sinalizar) => {
            const dadosTarefa = {
                titulo,
                dataCriacao,
                dataConclusao: dataConclusao || null,
                prioridade,
                status,
                projeto: {
                    id: projetoId
                },
                usuario: {
                    id: usuarioId
                }
            };

            console.log(dadosTarefa);

            if (id) {
                await atualizarTarefa(id, dadosTarefa, sinalizar);
            } else {
                await salvarTarefa(dadosTarefa, sinalizar);
            }
        },
    });

    const campoUsuario = form.campo("usuario");
    const campoProjeto = form.campo("projeto");

    return (
        <>
            <PaginaTopo
                titulo={id ? "Editar tarefa" : "Nova tarefa"}
                voltar={{ para: "/tarefas", rotulo: "Tarefas" }}
            />

            <Formulario
                estado={carga.estado}
                aoRecarregar={carga.recarregar}
                form={form}
                textoSalvar="Salvar tarefa"
                aoCancelar={voltar}
            >
                <Input
                    {...form.campo("titulo")}
                    rotulo="Título"
                    placeholder="Digite o título da tarefa"
                    larga
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                />
                <Input
                    {...form.campo("dataCriacao")}
                    rotulo="Data de criação"
                    type="date"
                    value={dataCriacao}
                    onChange={(e) => setDataCriacao(e.target.value)}
                />
                <Input
                    id="dataConclusao"
                    rotulo="Data de conclusão"
                    type="date"
                    value={dataConclusao}
                    onChange={(e) => setDataConclusao(e.target.value)}
                />
                <Input
                    {...campoUsuario}
                    rotulo="Atribuir para"
                    as="select"
                    value={usuarioId}
                    onChange={(e) => setUsuarioId(e.target.value)}
                    erro={campoUsuario.erro
                        || (usuarios.estado === "erro" ? "Não foi possível carregar os usuários." : "")}
                >
                    {primeiraOpcao(usuarios)}
                    {usuarios.itens.map((usuario) => (
                        <option key={usuario.id} value={usuario.id}>{usuario.nome}</option>
                    ))}
                </Input>
                <Input
                    {...campoProjeto}
                    rotulo="Projeto"
                    as="select"
                    value={projetoId}
                    onChange={(e) => setProjetoId(e.target.value)}
                    erro={campoProjeto.erro
                        || (projetos.estado === "erro" ? "Não foi possível carregar os projetos." : "")}
                >
                    {primeiraOpcao(projetos)}
                    {projetos.itens.map((projeto) => (
                        <option key={projeto.id} value={projeto.id}>{projeto.nome}</option>
                    ))}
                </Input>
                <Input
                    {...form.campo("prioridade")}
                    rotulo="Prioridade"
                    as="select"
                    value={prioridade}
                    onChange={(e) => setPrioridade(e.target.value)}
                >
                    <option disabled value="">Escolha uma opção...</option>
                    {opcoesDe(PRIORIDADE)}
                </Input>
                <Input
                    {...form.campo("status")}
                    rotulo="Status"
                    as="select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option disabled value="">Escolha uma opção...</option>
                    {opcoesDe(STATUS_TAREFA)}
                </Input>
            </Formulario>
        </>
    );
}

export default TarefaForm;
