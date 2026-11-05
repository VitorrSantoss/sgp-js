import { GlobalProvider } from "./contextos/GlobalContext";
import { ToastProvider } from "./componentes/Toast";
import Rotas from "./rotas";

function App() {
  return (
    <GlobalProvider>
      <ToastProvider>
        <Rotas />
      </ToastProvider>
    </GlobalProvider>
  );
}

export default App;
