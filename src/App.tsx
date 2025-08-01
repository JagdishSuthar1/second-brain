import './App.css'
import { BrowserRouter, Routes , Route } from 'react-router-dom'
import { AuthPage } from './pages/auth-page'
import LandingPage from './pages/landing-page'
import ProtectedRoutes from './protectedRoutes'
import { useContext } from 'react'
import { AuthContext } from './context/auth-context'
import DashboardPage from './pages/dashboard'
import ContentDetail from './pages/detail'
import ChatPage from './pages/chat'
import ShareAllContent from './pages/share'
import ShareSingleContent from './pages/share/singleContent'
// Includes all font weights


function App() {
  const {auth} = useContext(AuthContext)!

  return (
    <BrowserRouter>
    <Routes>
    <Route path='/auth' element ={<ProtectedRoutes authenticated={auth.authenticated} element={<AuthPage/>}/>}/>
      <Route path='/'  element={<LandingPage/>}  >
    </Route>
    <Route path={'/dashboard'} element ={<ProtectedRoutes authenticated={auth.authenticated} element={<DashboardPage/>}/>}/>
    <Route path={'/details'} element ={<ProtectedRoutes authenticated={auth.authenticated} element={<ContentDetail/>}/>}/>
    <Route path={'/details/single/:id'} element ={<ProtectedRoutes authenticated={auth.authenticated} element={<ShareSingleContent/>}/>}/>
    <Route path={'/chats'} element ={<ProtectedRoutes authenticated={auth.authenticated} element={<ChatPage/>}/>}/>
    <Route path={'/share/all/:id'} element ={<ProtectedRoutes authenticated={auth.authenticated} element={<ShareAllContent/>}/>}/>
    <Route path={'/share/single/:id'} element ={<ProtectedRoutes authenticated={auth.authenticated} element={<ShareSingleContent/>}/>}/>
    <Route path={'*'} element ={<div className='flex flex-col justify-center items-center w-screen h-screen font-black text-3xl'>No Page Found</div>}/>
    </Routes>
    </BrowserRouter>
    
      
  )
}

export default App
