import { api } from "./api";

export async function listarProjetos(setProjetos) {
  await api
    .get("/projetos")
    .then((resposta) => setProjetos(resposta.data))
    .catch((erro) => console.error(erro));
}

export async function buscarProjetoPeloId(id, setProjetos) {
  await api.get(`/projetos/${id}`)
    .then((resposta) => setProjetos(resposta.data))
    .catch((erro) => console.error(erro));
}

export async function cadastrarProjetos(projetos) {
  await api.post("/projetos", projetos)
    .then(() => { })
    .catch((erro) => console.error(erro));
}

export async function deletarProjetos(id) {
  await api.delete(`/projetos/${id}`)
    .then(() => { })
    .catch((erro) => console.error(erro));
}