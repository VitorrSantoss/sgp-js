import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Formulario from "../../../componentes/Formulario";
import Input from "../../../componentes/Input";
import PaginaTopo from "../../../componentes/PaginaTopo";
import { useCarga } from "../../../hooks/useCarga";
import { exigir, useFormulario, validarCpf, validarEmail } from "../../../hooks/useFormulario";
import { atualizarUsuario, obterUsuarioPeloId, salvarUsuario } from "../../../servicos/usuarios";
import { formatarData } from "../../../utils/data";
import { STATUS_USUARIO, opcoesDe } from "../../../utils/rotulos";

const REGRAS = {
    nome: exigir("Informe o nome completo."),
    cpf: validarCpf,
    email: validarEmail,
    dataNascimento: exigir("Informe a data de nascimento."),
    status: exigir("Escolha o status."),
};

function UsuarioForm() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [status, setStatus] = useState("");

    const carregar = useCallback((marcar) => obterUsuarioPeloId(
        id,
        (valor) => { marcar(); setNome(valor ?? ""); },
        (valor) => setCpf(valor ?? ""),
        (valor) => setDataNascimento(valor ?? ""),
        (valor) => setEmail(valor ?? ""),
        (valor) => setSenha(valor ?? ""),
        (valor) => setStatus(valor ?? "")
    ), [id]);

    const carga = useCarga(carregar, Boolean(id));
    const voltar = () => navigate("/usuarios");

    const form = useFormulario({
        regras: id ? REGRAS : { ...REGRAS, senha: exigir("Defina uma senha.") },
        valores: { nome, cpf, email, senha, dataNascimento, status },
        mensagem: `Usuário ${id ? "atualizado" : "cadastrado"} com sucesso!`,
        aoConcluir: voltar,
        salvar: async (sinalizar) => {
            const dadosUsuario = {
                nome,
                cpf,
                email,
                senha,
                dataNascimento: formatarData(dataNascimento),
                status
            };

            console.log(dadosUsuario);

            if (id) {
                await atualizarUsuario(id, dadosUsuario, sinalizar);
            } else {
                await salvarUsuario(dadosUsuario, sinalizar);
            }
        },
    });

    return (
        <>
            <PaginaTopo
                titulo={id ? "Editar usuário" : "Novo usuário"}
                voltar={{ para: "/usuarios", rotulo: "Usuários" }}
            />

            <Formulario
                estado={carga.estado}
                aoRecarregar={carga.recarregar}
                form={form}
                textoSalvar="Salvar usuário"
                aoCancelar={voltar}
            >
                <Input
                    {...form.campo("nome")}
                    rotulo="Nome"
                    placeholder="Digite o nome completo"
                    autoComplete="name"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <Input
                    {...form.campo("cpf")}
                    rotulo="CPF"
                    placeholder="000.000.000-00"
                    inputMode="numeric"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                />
                <Input
                    {...form.campo("email")}
                    rotulo="E-mail"
                    type="email"
                    placeholder="nome@exemplo.com.br"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {!id && (
                    <Input
                        {...form.campo("senha")}
                        rotulo="Senha"
                        type="password"
                        placeholder="Não compartilhe com ninguém."
                        autoComplete="new-password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                )}
                <Input
                    {...form.campo("dataNascimento")}
                    rotulo="Data de nascimento"
                    type="date"
                    value={dataNascimento}
                    onChange={(e) => setDataNascimento(e.target.value)}
                />
                <Input
                    {...form.campo("status")}
                    rotulo="Status"
                    as="select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option disabled value="">Escolha uma opção...</option>
                    {opcoesDe(STATUS_USUARIO)}
                </Input>
            </Formulario>
        </>
    );
}

export default UsuarioForm;
