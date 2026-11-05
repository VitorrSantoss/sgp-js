import { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, matchPath, useLocation } from "react-router-dom";
import { CheckSquare, FolderSimple, List, SignOut, SquaresFour, Users, X } from "@phosphor-icons/react";
import logo from "../../arquivos/imagens/sgp_logo_horizontal.png";
import Rodape from "../Rodape";
import { useToast } from "../Toast";
import { GlobalContext } from "../../contextos/GlobalContext";
import { useFocoPreso } from "../../hooks/useFocoPreso";
import { useMidia } from "../../hooks/useMidia";
import estilos from "./AppLayout.module.css";

const MENU = [
    { para: "/dashboard", rotulo: "Dashboard", icone: SquaresFour, filhas: [] },
    { para: "/usuarios", rotulo: "Usuários", icone: Users, filhas: ["/novo-usuario", "/usuario/:id"] },
    { para: "/projetos", rotulo: "Projetos", icone: FolderSimple, filhas: ["/novo-projeto", "/projeto/:id"] },
    { para: "/tarefas", rotulo: "Tarefas", icone: CheckSquare, filhas: ["/nova-tarefa", "/tarefa/:id"] },
];

function AppLayout() {
    const { logout } = useContext(GlobalContext);
    const toast = useToast();
    const { pathname } = useLocation();
    const desktop = useMidia("(min-width: 48rem)");
    const [menuAberto, setMenuAberto] = useState(false);
    const painel = useRef(null);
    const conteudo = useRef(null);
    const rotaAnterior = useRef(pathname);

    const drawerAberto = menuAberto && !desktop;

    useFocoPreso(painel, drawerAberto, () => setMenuAberto(false));

    // Sem reload na navegação: o foco e a rolagem precisam ir ao conteúdo à mão.
    // Compara a rota porque o StrictMode roda este efeito duas vezes na montagem.
    useEffect(() => {
        if (rotaAnterior.current === pathname) return;

        rotaAnterior.current = pathname;
        setMenuAberto(false);
        window.scrollTo(0, 0);
        conteudo.current?.focus({ preventScroll: true });
    }, [pathname]);

    const sair = () => {
        logout();
        toast.sucesso("Sessão encerrada.");
    };

    return (
        <div className={estilos.layout}>
            <a href="#conteudo" className={estilos.pular}>Pular para o conteúdo</a>

            <header className={estilos.topo}>
                <div className={estilos.faixa}>
                    <Link to="/dashboard" className={estilos.logo}>
                        <img src={logo} alt="Sistema de Gestão de Projetos" width="1920" height="631" />
                    </Link>

                    <button
                        type="button"
                        className={estilos.abrir}
                        onClick={() => setMenuAberto(true)}
                        aria-label="Abrir menu"
                        aria-expanded={drawerAberto}
                        aria-controls="menu-lateral"
                    >
                        <List size={24} aria-hidden="true" />
                    </button>

                    {drawerAberto && <div className={estilos.fundo} onClick={() => setMenuAberto(false)} />}

                    <div
                        id="menu-lateral"
                        ref={painel}
                        className={`${estilos.menu} ${drawerAberto ? estilos.aberto : ""}`}
                    >
                        {drawerAberto && (
                            <button
                                type="button"
                                className={estilos.abrir}
                                onClick={() => setMenuAberto(false)}
                                aria-label="Fechar menu"
                            >
                                <X size={24} aria-hidden="true" />
                            </button>
                        )}

                        <nav aria-label="Principal">
                            <ul className={estilos.lista}>
                                {MENU.map(({ para, rotulo, icone: Icone, filhas }) => {
                                    const emFilha = filhas.some((rota) => matchPath(rota, pathname));

                                    return (
                                        <li key={para}>
                                            <NavLink
                                                to={para}
                                                className={({ isActive }) =>
                                                    `${estilos.item} ${isActive || emFilha ? estilos.ativo : ""}`
                                                }
                                            >
                                                <Icone size={20} aria-hidden="true" />
                                                {rotulo}
                                            </NavLink>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>

                        <button type="button" className={`${estilos.item} ${estilos.sair}`} onClick={sair}>
                            <SignOut size={20} aria-hidden="true" />
                            Sair
                        </button>
                    </div>
                </div>
            </header>

            <div className={estilos.coluna} inert={drawerAberto || undefined}>
                <main id="conteudo" ref={conteudo} className={estilos.conteudo} tabIndex={-1}>
                    <Outlet />
                </main>
                <Rodape />
            </div>
        </div>
    );
}

export default AppLayout;
