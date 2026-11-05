// O canvas do Chart.js não enxerga var(--x): os valores são lidos do :root.
export function token(nome) {
    return getComputedStyle(document.documentElement).getPropertyValue(nome).trim();
}

function animacao() {
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return reduzido ? false : { duration: 250 };
}

// Hachura diagonal: separa Média de Alta sem depender de distinguir âmbar de laranja.
export function hachura(cor, linha) {
    const lado = 10;
    const tela = document.createElement("canvas");
    tela.width = lado;
    tela.height = lado;

    const ctx = tela.getContext("2d");
    ctx.fillStyle = cor;
    ctx.fillRect(0, 0, lado, lado);
    ctx.strokeStyle = linha;
    ctx.lineWidth = 1.5;
    [[-1, lado + 1, lado + 1, -1], [-1, 1, 1, -1], [lado - 1, lado + 1, lado + 1, lado - 1]]
        .forEach(([x1, y1, x2, y2]) => {
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        });

    return ctx.createPattern(tela, "repeat");
}

// O canvas não quebra linha: o nome do projeto vira um array de linhas.
export function quebrarRotulo(texto, limite) {
    return String(texto ?? "").split(" ").reduce((linhas, palavra) => {
        const ultima = linhas[linhas.length - 1];

        if (ultima !== undefined && `${ultima} ${palavra}`.length <= limite) {
            linhas[linhas.length - 1] = `${ultima} ${palavra}`;
        } else {
            linhas.push(palavra);
        }

        return linhas;
    }, []);
}

const fonte = () => ({ family: token("--fonte"), size: 13 });

export function tooltip() {
    return {
        backgroundColor: token("--grafico-tooltip"),
        titleColor: token("--grafico-tooltip-texto"),
        bodyColor: token("--grafico-tooltip-texto"),
        titleFont: { ...fonte(), weight: "600" },
        bodyFont: fonte(),
        padding: 12,
        cornerRadius: 6,
        boxPadding: 4,
    };
}

export function opcoesBarras({ horizontal = false } = {}) {
    const cor = token("--grafico-texto");
    const valores = {
        beginAtZero: true,
        ticks: { precision: 0, color: cor, font: fonte() },
        grid: { color: token("--grafico-grade") },
        border: { display: false },
    };
    const categorias = {
        ticks: { color: cor, font: fonte(), autoSkip: false, maxRotation: 0 },
        grid: { display: false },
        border: { color: token("--grafico-eixo") },
    };

    return {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: horizontal ? "y" : "x",
        animation: animacao(),
        scales: horizontal ? { x: valores, y: categorias } : { x: categorias, y: valores },
        plugins: {
            legend: {
                position: "bottom",
                labels: { color: cor, font: fonte(), boxWidth: 16, boxHeight: 16, padding: 16 },
            },
            tooltip: tooltip(),
        },
    };
}

export function opcoesRosca() {
    return {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "68%",
        animation: animacao(),
        plugins: { legend: { display: false }, tooltip: tooltip() },
    };
}
