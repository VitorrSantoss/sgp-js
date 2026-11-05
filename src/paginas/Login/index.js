import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../arquivos/imagens/sgp_logo_vertical.png";
import Botao from "../../componentes/Botao";
import Input from "../../componentes/Input";
import { GlobalContext } from "../../contextos/GlobalContext";
import { exigir, useFormulario, validarEmail } from "../../hooks/useFormulario";
import estilos from "./Login.module.css";

const REGRAS = {
    email: validarEmail,
    senha: exigir("Informe a senha."),
};

function Login() {
    const { login } = useContext(GlobalContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [manterConectado, setManterConectado] = useState(true);

    const form = useFormulario({
        regras: REGRAS,
        valores: { email, senha },
        aoConcluir: () => navigate("/dashboard"),
        salvar: async (sinalizar) => {
            login({ email, senha, manterConectado });
            sinalizar();
        },
    });

    useEffect(() => {
        document.title = "Entrar | SGP";
    }, []);

    return (
        <div className={estilos.tela}>
            <main className={estilos.lado}>
                <div className={estilos.caixa}>
                    <img src={logo} alt="Sistema de Gestão de Projetos" width="500" height="500" className={estilos.logo} />

                    <h1 className={estilos.titulo}>Acesse sua conta</h1>

                    <form onSubmit={form.enviar} noValidate className={estilos.campos}>
                        <Input
                            {...form.campo("email")}
                            rotulo="E-mail"
                            type="email"
                            autoComplete="email"
                            placeholder="nome@exemplo.com.br"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            {...form.campo("senha")}
                            rotulo="Senha"
                            type="password"
                            autoComplete="current-password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />

                        <div className={estilos.manter}>
                            <input
                                id="manterConectado"
                                type="checkbox"
                                checked={manterConectado}
                                onChange={(e) => setManterConectado(e.target.checked)}
                            />
                            <label htmlFor="manterConectado">Mantenha-me conectado</label>
                        </div>

                        <Botao tipo="submit" tamanho="lg" texto="Acessar" carregando={form.enviando} />
                    </form>
                </div>
            </main>

            <aside className={estilos.painel}>
                <div className={estilos.mensagem}>
                    <p className={estilos.chamada}>Projetos, tarefas e equipes em um só lugar.</p>
                    <p>Acompanhe o andamento do trabalho e o que precisa de atenção hoje.</p>
                </div>
            </aside>
        </div>
    );
}

export default Login;
