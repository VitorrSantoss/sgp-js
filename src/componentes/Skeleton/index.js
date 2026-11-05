import estilos from "./Skeleton.module.css";

function Skeleton({ altura = "1rem" }) {
    return <span className={estilos.bloco} style={{ height: altura }} aria-hidden="true" />;
}

// Anuncia a espera uma vez; os blocos ficam fora da árvore de acessibilidade.
export function Carregando({ rotulo, children }) {
    return (
        <div className={estilos.area} aria-busy="true">
            <p role="status" className="sr-only">{rotulo}</p>
            {children}
        </div>
    );
}

export default Skeleton;
