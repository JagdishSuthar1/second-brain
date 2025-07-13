import './App.css'
import { BrowserRouter, Routes , Route } from 'react-router-dom'
import { AuthPage } from './pages/auth-page'
import LandingPage from './pages/landing-page'
import ProtectedRoutes from './protectedRoutes'
import { useContext } from 'react'
import { AuthContext } from './context/auth-context'
import DashboardPage from './pages/dashboard'
import MainPage from './components/landing/mainpage'
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
    {/* <Route path='/home' element ={<ProtectedRoutes authenticated={auth.authenticated} element={<LandingPage/>}/>}>
    //  */}

      <Route path='/'  element={<LandingPage/>}>

    <Route index element={<MainPage/>}/>
    </Route>

    <Route path={'/dashboard'} element ={<ProtectedRoutes authenticated={auth.authenticated} element={<DashboardPage/>}/>}/>
    <Route path={'/details'} element ={<ProtectedRoutes authenticated={auth.authenticated} element={<ContentDetail/>}/>}/>
    <Route path={'/details/single/:id'} element ={<ProtectedRoutes authenticated={auth.authenticated} element={<ShareSingleContent/>}/>}/>
    <Route path={'/chats'} element ={<ProtectedRoutes authenticated={auth.authenticated} element={<ChatPage/>}/>}/>
    <Route path={'/share/all/:id'} element ={<ProtectedRoutes authenticated={auth.authenticated} element={<ShareAllContent/>}/>}/>
    <Route path={'/share/single/:id'} element ={<ProtectedRoutes authenticated={auth.authenticated} element={<ShareSingleContent/>}/>}/>

    {/* <Route path={'*'} element ={<div>No Page Found</div>}/> */}
    {/* <Route path='/home' element ={<LandingPage/>}/> */}
    </Routes>
    </BrowserRouter>
    
      
  )
}

export default App
