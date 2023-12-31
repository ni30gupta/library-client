import React, { useState } from 'react';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBCollapse,
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [openBasic, setOpenBasic] = useState(false);
    const navigate = useNavigate();

    const logout =()=> {
        // clearing the localstorage to remove auth token hence logging out
        localStorage.clear()
        navigate('/')
    }

    return (
        <MDBNavbar expand='lg' light bgColor='light'>
            <MDBContainer fluid>
                <MDBNavbarBrand >
                <Link to="/">
                    Browse Library
                    </Link>
                    </MDBNavbarBrand>

                <MDBNavbarToggler
                    aria-controls='navbarSupportedContent'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={() => setOpenBasic(!openBasic)}
                >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>

                <MDBCollapse navbar open={openBasic}>
                    <MDBNavbarNav className='mr-auto mb-2 mb-lg-0' style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <MDBNavbarItem>
                            <Link to="/account">
                                <MDBNavbarLink >My Account</MDBNavbarLink>
                            </Link>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                        <Link to="/manage">
                                <MDBNavbarLink >Manage Library</MDBNavbarLink>
                            </Link>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                                <MDBNavbarLink onClick={logout}>Log Out</MDBNavbarLink>
                        </MDBNavbarItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
}