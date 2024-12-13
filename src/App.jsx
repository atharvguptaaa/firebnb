import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './Header/Header'
import LoginPage from './pages/Loginpage'
import Layout from './Layout'
import IndexPage from './pages/IndexPage'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import ProfilePage from './pages/ProfilePage'
import PlacesPage from './pages/PlacesPage'
import PlacesFormPage from './pages/PlacesFormPage'
import PlacePage from './pages/PlacePage'
import BookingsPage from './pages/BookingsPage'
import BookingPage from './pages/BookingPage'
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
      {/* <Route path="/account" element={<AccountPage />} /> */}
      <Route path="/account" element={<ProfilePage/>}/>
      <Route path="/account/places" element={<PlacesPage/>}/>
      <Route path="/account/places/new" element={<PlacesFormPage/>}/>
      <Route path="/account/places/:id" element={<PlacesFormPage/>}/>
      <Route path="/place/:id" element={<PlacePage/>}/>
      <Route path="/account/bookings" element={<BookingsPage/>}/>
      <Route path="/account/bookings/:id" element={<BookingPage/>}/>

      </Route>
      
      </Routes>
    </UserContextProvider>
  )
}

export default App
