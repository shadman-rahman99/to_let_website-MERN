import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Container } from '@material-ui/core'
import NavbarComponent from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import AdminAuth from './components/Auth/AdminAuth'
import PostDetails from './components/PostDetails/PostDetails'
import Chats from './components/Chats/Chats'
import AdminHome from './components/AdminHome/AdminHome'
import PrivateRoute from './components/PrivateRoute'

function App() {
    // const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('profile'))
    return (
        <BrowserRouter>
            <Container maxWidth='xl'>
                {/* placing Navbar here since it will always show */}
                <NavbarComponent/>
                    <Routes>
                        <Route exact path='/' element={<PrivateRoute/>}>
                            <Route exact path='/posts' element={<Home/>} />
                            <Route exact path='/' element={ user?.userType !=="ADMIN"? <Navigate replace to="/posts" />: <Navigate replace to="/adminHome" /> }/>
                            <Route exact path='/posts/search' element={<Home/>} />
                            <Route path='/posts/:id' element={<PostDetails/>} />
                            <Route path='/chats' element={ <Chats/>}/>
                            <Route path='/adminHome' element={<AdminHome/>} />
                        </Route>     
                        <Route exact path='/auth' element={ <Auth/>}/>
                        <Route exact path='/adminAuth' element={ <AdminAuth/>}/>
                    </Routes>
            </Container>
        </BrowserRouter>
    )
}

export default App
