import {
    ArrowDown,
    ArrowUp,
    CheckCircle,
    CircleHalf,
    Clock,
    Equals,
    MinusCircle,
    UserCheck,
} from "@phosphor-icons/react";

// As chaves são os valores enviados à API; só o rótulo exibido muda.
export const STATUS_TAREFA = {
    PENDENTE: { rotulo: "Pendente", icone: Clock, tom: "ambar" },
    FAZENDO: { rotulo: "Fazendo", icone: CircleHalf, tom: "info" },
    FINALIZADA: { rotulo: "Finalizada", icone: CheckCircle, tom: "marinho" },
};

export const PRIORIDADE = {
    ALTA: { rotulo: "Alta", icone: ArrowUp, tom: "laranja" },
    MEDIA: { rotulo: "Média", icone: Equals, tom: "ambar" },
    BAIXA: { rotulo: "Baixa", icone: ArrowDown, tom: "neutro" },
};

export const STATUS_USUARIO = {
    ATIVO: { rotulo: "Ativo", icone: UserCheck, tom: "marinho" },
    INATIVO: { rotulo: "Inativo", icone: MinusCircle, tom: "neutro" },
};

export function opcoesDe(mapa) {
    return Object.entries(mapa).map(([valor, { rotulo }]) => (
        <option key={valor} value={valor}>{rotulo}</option>
    ));
}
