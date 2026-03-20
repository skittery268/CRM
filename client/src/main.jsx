import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router"
import { ToastContainer } from "react-toastify"
import { AuthProvider } from './context/AuthContext.jsx'
import { ClientProvider } from './context/ClientContext.jsx'
import { ContractProvider } from './context/ContractContext.jsx'
import "./index.css"

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <ClientProvider>
        <ContractProvider>
          <App />
          <ToastContainer position='bottom-right' />
        </ContractProvider>
      </ClientProvider>
    </AuthProvider>
  </BrowserRouter>,
)
