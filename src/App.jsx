import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './Header/Header'
import LoginPage from './pages/Loginpage'
import Layout from './Layout'
import IndexPage from './pages/IndexPage'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import AccountPage from './pages/AccountPage'
function App() {
axios.defaults.baseURL="http://localhost:4000";
axios.defaults.withCredentials=true;
  return (
    <UserContextProvider>
      <Routes>
      <Route path="/" element={<Layout/>}>
      <Route index element={<IndexPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/account" element={<AccountPage/>}/>
      </Route>
      
      </Routes>
    </UserContextProvider>
  )
}

export default App
