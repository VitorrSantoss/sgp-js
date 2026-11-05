import { CheckCircle, Info, Warning, WarningCircle } from "@phosphor-icons/react";
import estilos from "./Alerta.module.css";

const VARIANTES = {
    primary: { icone: Info, papel: "status" },
    success: { icone: CheckCircle, papel: "status" },
    warning: { icone: Warning, papel: "status" },
    danger: { icone: WarningCircle, papel: "alert" },
};

function Alerta({ cor = "primary", mensagem = "" }) {
    const { icone: Icone, papel } = VARIANTES[cor] ?? VARIANTES.primary;

    return (
        <div role={papel} className={`${estilos.alerta} ${estilos[cor]}`}>
            <Icone size={20} weight="fill" className={estilos.icone} aria-hidden="true" />
            <p>{mensagem}</p>
        </div>
    );
}

export default Alerta;
