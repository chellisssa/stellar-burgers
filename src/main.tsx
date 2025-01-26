import ReactDOM from 'react-dom/client'
import App from './components/app/app.tsx'
import './index.css'
import { ModalProvider } from "./components/modal/modal-context/modal-context.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ModalProvider>
    <App />
  </ModalProvider>,
)
