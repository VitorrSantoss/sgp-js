import { api } from "./api";

export async function listarTarefas(setTarefas) {
  await api
    .get("/tarefas")
    .then((resposta) => setTarefas(resposta.data))
    .catch((erro) => console.error(erro));
}

export async function buscarTarefaPeloId(id, setTarefas) {
  await api.get(`/tarefas/${id}`)
    .then((resposta) => setTarefas(resposta.data))
    .catch((erro) => console.error(erro));
}

export async function cadastrarTarefas(tarefas) {
  await api.post("/tarefas", tarefas)
    .then(() => { })
    .catch((erro) => console.error(erro));
}

export async function deletarTarefas(id) {
  await api.delete(`/tarefas/${id}`)
    .then(() => { })
    .catch((erro) => console.error(erro));
}