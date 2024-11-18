import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./Topbar.css";
import { useContext} from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import { logoutcall } from '../../apiCalls';
import { Link } from 'react-router-dom';


function UserNavbar() {

  const navigate = useNavigate();
  const { user ,isFetching , error , dispatch } = useContext(AuthContext);

  const LogoutButton = (e) => {
    e.preventDefault();
    logoutcall( dispatch );
    navigate(`/login`);
    window.location.reload(true);
  }

  return (
    <Navbar collapseOnSelect expand="lg" className="color-nav" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand href="#home" className='Navbrand'>Exam center</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
            <Nav.Link className='logout' onClick = {LogoutButton} disabled = {isFetching} > Logout</Nav.Link>
            <Nav.Link >Profile</Nav.Link> <Nav.Link >
            <Link to = {`/userprofile/${user._id}`}>
            <img crossorigin="anonymous" src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"  alt="" className="topbarImg"/>
            </Link></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default UserNavbar;