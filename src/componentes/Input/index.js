import { CaretDown, WarningCircle } from "@phosphor-icons/react";
import estilos from "./Input.module.css";

// Campo completo: label visível, controle e erro ligado por aria-describedby.
// `as`: "input", "select" ou "textarea". `larga` ocupa a linha inteira do grid.
function Input({ id, rotulo, erro = "", obrigatorio, as: Controle = "input", larga, children, ...resto }) {
    const idErro = `${id}-erro`;

    return (
        <div className={`${estilos.campo} ${larga ? estilos.larga : ""}`}>
            <label htmlFor={id} className={estilos.rotulo}>
                {rotulo}
                {obrigatorio && <span className={estilos.marca} aria-hidden="true"> *</span>}
            </label>

            <div className={estilos.caixa}>
                <Controle
                    id={id}
                    className={`${estilos.controle} ${erro ? estilos.invalido : ""}`}
                    aria-required={obrigatorio || undefined}
                    aria-invalid={erro ? true : undefined}
                    aria-describedby={idErro}
                    {...resto}
                >
                    {children}
                </Controle>
                {Controle === "select" && <CaretDown size={16} className={estilos.seta} aria-hidden="true" />}
            </div>

            <div id={idErro} className={estilos.erro} aria-live="polite">
                {erro && (
                    <>
                        <WarningCircle size={16} weight="fill" aria-hidden="true" />
                        <span>{erro}</span>
                    </>
                )}
            </div>
        </div>
    );
}

export default Input;
