import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AuthProvider from './context/auth-context/index.tsx'
import DashboardContextProvider from './context/dashboard-context/index.tsx'
import ChatContextProvider from './context/chat-context/index.tsx'

createRoot(document.getElementById('root')!).render(
    <AuthProvider>
      <DashboardContextProvider>
        <ChatContextProvider>
        <App />
        </ChatContextProvider>
      </DashboardContextProvider>
    </AuthProvider>
)
