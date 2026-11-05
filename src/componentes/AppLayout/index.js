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

function Logo() {
    return (
        <Link to="/dashboard" className={estilos.logo}>
            <img src={logo} alt="Sistema de Gestão de Projetos" width="1920" height="631" />
        </Link>
    );
}

function AppLayout() {
    const { logout } = useContext(GlobalContext);
    const toast = useToast();
    const { pathname } = useLocation();
    const desktop = useMidia("(min-width: 64rem)");
    const [menuAberto, setMenuAberto] = useState(false);
    const lateral = useRef(null);
    const conteudo = useRef(null);
    const rotaAnterior = useRef(pathname);

    const drawerAberto = menuAberto && !desktop;

    useFocoPreso(lateral, drawerAberto, () => setMenuAberto(false));

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

            <header className={estilos.topo} inert={drawerAberto || undefined}>
                <button
                    type="button"
                    className={estilos.menu}
                    onClick={() => setMenuAberto(true)}
                    aria-label="Abrir menu"
                    aria-expanded={drawerAberto}
                    aria-controls="menu-lateral"
                >
                    <List size={24} aria-hidden="true" />
                </button>
                <Logo />
            </header>

            {drawerAberto && <div className={estilos.fundo} onClick={() => setMenuAberto(false)} />}

            <aside
                id="menu-lateral"
                ref={lateral}
                className={`${estilos.lateral} ${drawerAberto ? estilos.aberta : ""}`}
            >
                <div className={estilos.marca}>
                    <Logo />
                    {drawerAberto && (
                        <button
                            type="button"
                            className={estilos.menu}
                            onClick={() => setMenuAberto(false)}
                            aria-label="Fechar menu"
                        >
                            <X size={24} aria-hidden="true" />
                        </button>
                    )}
                </div>

                <nav className={estilos.navegacao} aria-label="Principal">
                    <ul>
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
                                        {({ isActive }) => (
                                            <>
                                                <Icone
                                                    size={20}
                                                    weight={isActive || emFilha ? "fill" : "regular"}
                                                    aria-hidden="true"
                                                />
                                                {rotulo}
                                            </>
                                        )}
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
            </aside>

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
