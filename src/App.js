import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./paginas/Login";
import Home from "./paginas/Home";
import Usuarios from "./paginas/Usuarios";
import FormularioUsuario from "./paginas/Usuarios/FormularioUsuario";
import Tarefas from "./paginas/Tarefas";
import FormularioTarefa from "./paginas/Tarefas/FormularioTarefa";
import Projetos from "./paginas/Projetos";
import FormularioProjeto from "./paginas/Projetos/FormularioProjeto";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/usuarios/novo" element={<FormularioUsuario />} />
        <Route path="/usuarios/:id" element={<FormularioUsuario />} />
        <Route path="/tarefas" element={<Tarefas />} />
        <Route path="/tarefas/nova" element={<FormularioTarefa />} />
        <Route path="/tarefas/:id" element={<FormularioTarefa />} />
        <Route path="/projetos" element={<Projetos />} />
        <Route path="/projetos/novo" element={<FormularioProjeto />} />
        <Route path="/tarefas/:id" element={<FormularioProjeto />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;