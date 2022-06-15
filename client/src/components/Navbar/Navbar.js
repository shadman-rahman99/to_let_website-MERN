import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { Avatar, Button } from '@material-ui/core'
import { Apartment } from '@material-ui/icons'
import decode from 'jwt-decode'
import { Navbar, Nav, NavDropdown, Container} from 'react-bootstrap'
import { OWNER, TENANT } from '../../constants/actionTypes'
import ContactModal from '../ContactModal'


// ************************************************** //
// !  Backend and all logical functions disabled
// ************************************************** //

function paymentGateway(){
  fetch("http://localhost:5000/create-checkout-session", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    items: [
      { id: 1, quantity: 1},
    ],
  }),
})
  .then(res => {
    if (res.ok) return res.json()
    return res.json().then(json => Promise.reject(json))
  })
  .then(({ url }) => {
      console.log(url);
    window.location = url
  })
  .catch(e => {
    console.error(e.error)
  })
}


function NavbarComponent() {
    
    const navigate = useNavigate()
    const dispatch = useDispatch() 
    const location = useLocation()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const [modalShow, setModalShow] = React.useState(false);
    // console.log(user);

    const logout = ()=> {
        dispatch({ type: 'LOGOUT' })
        navigate('/auth')
        setUser(null)
    }

    useEffect(() => {
        const token = user?.token
        if(token){
            const decodedToken = decode(token)
            // exp gets the value for time expiry. If condition is true then user session (token)
            // has expired 
            if(decodedToken.exp * 1000 < new Date().getTime()) return logout()
        }
        // JWT
        setUser(JSON.parse(localStorage.getItem('profile')))
        // location variable from useLocation function stores current URL. Whenever data in
        // location changes useEffect will be called.
    }, [location])
    
    return (
      <>
      <Navbar fixed='top' expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/posts">
              <Apartment style={{fontSize:'30px',marginRight:'4px', marginBottom:'3px' }} />
              To-let in Dhaka
            </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                  
                  {
                    user? (
                      user?.result?.userType == OWNER ? (
                        <Nav className="me-auto">
                        <Nav.Link href="#allRooms">All Rooms</Nav.Link>
                        <Nav.Link href="#myRooms">My Rooms</Nav.Link>
                        <Nav.Link href="#addRoom">Add a Room</Nav.Link>
                        <Nav.Link href="#tenants">Tenants</Nav.Link>
                        <Nav.Link href="/chats">Send Message</Nav.Link>
                        <Nav.Link onClick={()=> setModalShow(true) } href="#">Contact Us</Nav.Link>
                        <Button  onClick={logout} variant="contained" color='secondary'>Logout</Button>
                      </Nav>
                      ):user?.result?.userType == TENANT ? (
                        <Nav className="me-auto">
                        <Nav.Link href="#allRooms">All Rooms</Nav.Link>
                        <Nav.Link href="#tenants">My Rents</Nav.Link>
                        <Nav.Link href="/chats">Send Message</Nav.Link>
                        <Nav.Link onClick={()=> setModalShow(true) } href="#">Contact Us</Nav.Link>
                        <Nav.Link onClick={paymentGateway} >Make Payment</Nav.Link>
                        <Button  onClick={logout} variant="contained" color='secondary'>Logout</Button>
                      </Nav>
                      ):(
                        <Button  onClick={logout} variant="contained" color='secondary'>Logout</Button>
                      )
                    ) : (
                      <Button style={{marginTop:'5px'}} component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
                    )
                  }
              </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
        
        <ContactModal show={modalShow} onHide={() =>{ 
          setModalShow(false)}}
      />
      </>
    )
}

export default NavbarComponent
