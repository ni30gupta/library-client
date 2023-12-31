import React, { useEffect, useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon
}
    from 'mdb-react-ui-kit';
import axios from 'axios'
import { base_url } from '../config';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [name, setName] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
        checkToken()
    }, [])


    const checkToken = () => {
        const token = localStorage.getItem('token')
        if (token) {
            // navigate to library page
            navigate('/')
        }
    }

    const handleRegister = () => {
        if (!username || !password || !name || !email || !contactNumber) {
            alert('Please fill all fields!')
            return
        }
        // check password and confird password
        if (password !== confirmPassword) {
            alert('password and confirm password mismatched!')
            setConfirmPassword('')
            setPassword('')
            return
        }

        const payload = { username, password, name, email, contactNumber }  
        axios.post(`${base_url}/users`, payload)
            .then(data => {
                // setting token in localstorage to persist login
                localStorage.setItem('token', data.data.token)
                navigate('/')

            })
            .catch(error => console.log(error));
    }

    return (
        <MDBContainer fluid>
            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                <MDBCol col='12'>

                    <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
                        <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

                            <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
                            <p className="text-white-50 mb-5">Please enter all the details!</p>

                            <MDBInput className='text-red'
                                value={name}
                                onChange={e => setName(e.target.value)}
                                wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Full Name' id='formControlLg' type='text' size="lg" />
                            <MDBInput className='text-red'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Email address' id='formControlLg' type='email' size="lg" />
                            <MDBInput className='text-red'
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Username' id='formControlLg' type='text' size="lg" />
                            <MDBInput className='text-red'
                                value={contactNumber}
                                onChange={e => setContactNumber(e.target.value)}
                                wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Contact Number' id='formControlLg' type='text' size="lg" />
                            <MDBInput className='text-red'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg' type='password' size="lg" />
                            <MDBInput className='text-red'
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Confirm Password' id='formControlLg' type='password' size="lg" />

                            <MDBBtn onClick={handleRegister} outline className='mx-2 px-5' color='white' size='lg'>
                                Register
                            </MDBBtn>

                            <div className='d-flex flex-row mt-3 mb-5'>
                                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                                    <MDBIcon fab icon='facebook-f' size="lg" />
                                </MDBBtn>

                                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                                    <MDBIcon fab icon='twitter' size="lg" />
                                </MDBBtn>

                                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                                    <MDBIcon fab icon='google' size="lg" />
                                </MDBBtn>
                            </div>

                            <div>
                                <Link to="/login">
                                    <p className="mb-0">Already Registered ! <a href="#!" class="text-white-50 fw-bold">Log in</a></p>
                                </Link>

                            </div>
                        </MDBCardBody>
                    </MDBCard>

                </MDBCol>
            </MDBRow>

        </MDBContainer>
    );
}

export default Register;