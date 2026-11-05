import estilos from "./Badge.module.css";

// Recebe o valor cru da API e um mapa de utils/rotulos.js: sempre ícone e texto.
function Badge({ valor, mapa }) {
    const item = mapa[valor];

    if (!item) return null;

    const { rotulo, icone: Icone, tom } = item;

    return (
        <span className={`${estilos.badge} ${estilos[tom]}`}>
            <Icone size={15} weight="bold" aria-hidden="true" />
            {rotulo}
        </span>
    );
}

export default Badge;
