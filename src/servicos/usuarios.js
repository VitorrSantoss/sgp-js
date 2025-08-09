import { api } from "./api";

export async function listarUsuarios(setUsuarios) {
  await api
    .get("/usuarios")
    .then((resposta) => setUsuarios(resposta.data))
    .catch((erro) => console.error(erro));
}

export async function buscarUsuarioPeloId(
  id,
  setNome,
  setCpf,
  setEmail,
  setSenha,
  SetDataNascimento,
  setStatus
) {

  await api.get(`/usuarios/${id}`)
    .then((resposta) => {
      setNome(resposta.data.nome)
      setCpf(resposta.data.cpf)
      setEmail(resposta.data.email)
      setSenha(resposta.data.senha)
      SetDataNascimento(resposta.data.dataNascimento)
      setStatus(resposta.data.status)
      setNome(resposta.data.nome)
    })
    .catch((erro) => console.error(erro));
}

export async function cadastrarUsuarios(usuarios, navigate) {
  await api
    .post("/usuarios", usuarios)
    .then(() => navigate("/usuarios"))
    .catch((erro) => console.error(erro));
}

export async function deletarUsuario(id) {
  await api.delete(`/usuarios/${id}`)
    .then(() => { })
    .catch((erro) => console.error(erro));
}

export async function atualizarUsuario(id, usuarios, navigate) {
  await api.put(`/usuarios/${id}`, usuarios)
    .then(() => navigate("/usuarios"))
    .catch((erro) => console.error);

}