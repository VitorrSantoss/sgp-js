const semAcento = (texto) =>
    String(texto ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export function casaBusca(busca, ...campos) {
    const termo = semAcento(busca).trim();
    return termo === "" || campos.some((campo) => semAcento(campo).includes(termo));
}
