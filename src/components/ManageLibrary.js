import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { base_url } from '../config';
import axios from 'axios';
import Book from './Book';
import { MDBCol, MDBContainer, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalFooter, MDBModalHeader, MDBModalTitle, MDBRadio, MDBRow } from 'mdb-react-ui-kit';
import TableData from './TableData';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';


export const ManageLibrary = () => {
    const [books, setBooks] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [users, setUsers] = useState([])
    const [selectedBook, setSelectedBook] = useState({})
    const [selectedUser, setSelectedUser] = useState('')

    useEffect(() => {
        fetchUsers()
        checkToken()
        fetchBooks()
    }, [])

    const fetchUsers = () => {
        axios.get(`${base_url}/users`)
            .then(res => setUsers(res.data))
    }

    const navigate = useNavigate();

    const checkToken = () => {
        const token = localStorage.getItem('token')
        if (!token) {
            // navigate to login page
            navigate('/login')
        }
    }
    const fetchBooks = () => {
        axios.get(`${base_url}/books`)
            .then(res => setBooks(res.data))
    }

    const showAction = (status, id, name) => {
        console.log(status)
        if (status == 'issued') {
            return <MDBBtn onClick={() => takeBack(id)} color='link' rounded size='sm'>
                Take Back
            </MDBBtn>
        } else {
            return <MDBBtn onClick={() => {
                setSelectedBook({ id, name });
                setOpenModal(true)
            }} color='link' rounded size='sm'>
                Issue To
            </MDBBtn>
        }
    }

    const toggleOpen = () => {
        setOpenModal(!openModal)
    }

    const issueBook = () => {
        const bearerToken = localStorage.getItem('token')
        const payload = { userId: selectedUser, bookId: selectedBook.id }
        axios.post(`${base_url}/transactions/issue`, payload, {
            headers: {
                Authorization: `Bearer ${bearerToken}`,
            }
        })
            .then(res => { res.status === 200 && fetchBooks() })
            .catch(err => {
                if (err.code === "ERR_BAD_REQUEST") {
                    alert('You do not have permission to perform this action!')
                }
                console.log(err)
            })
        toggleOpen()
    }

    const takeBack = (id) => {
        const bearerToken = localStorage.getItem('token')
        const payload = { bookId: id }
        axios.post(`${base_url}/transactions/return`, payload, {
            headers: {
                Authorization: `Bearer ${bearerToken}`,
            }
        })
            .then(res => { res.status == 200 && fetchBooks() })
            .catch(err => {
                if (err.code === "ERR_BAD_REQUEST") {
                    alert('You do not have permission to perform this action!')
                }
                console.log(err)
            })
    }



    return (
        <div>
            <MDBTable color='secondary' align='middle'>
                <MDBTableHead >
                    <tr>
                        <th scope='col'>Name</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Actions</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {
                        books.map(({ author, name, status, _id }) => (
                            <tr>
                                <td>
                                    <div className='d-flex align-items-center'>
                                        <img
                                            src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                            alt=''
                                            style={{ width: '45px', height: '45px' }}
                                            className='rounded-circle'
                                        />
                                        <div className='ms-3'>
                                            <p className='fw-bold mb-1'>{name}</p>
                                            <p className='text-muted mb-0'>{author}</p>
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    <MDBBadge className="p-2" color={status === 'issued' ? 'danger' : 'success'} pill>
                                        {status}
                                    </MDBBadge>
                                </td>
                                <td>

                                    {showAction(status, _id, name)}

                                </td>
                            </tr>
                        ))
                    }
                </MDBTableBody>
            </MDBTable>

            <MDBModal tabIndex='-1' open={openModal} setOpen={setOpenModal}>
                <MDBModalDialog centered>
                    <MDBModalContent style={{ background: 'darkblue' }} >
                        <MDBModalHeader>
                            <MDBModalTitle>Select a user to issue book : {selectedBook.name?.toUpperCase()}</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody  >
                            {
                                users.map(user => (
                                    <MDBRadio onChange={() => setSelectedUser(user._id)} name='flexRadioDefault' id='flexRadioDefault1' label={user.name} />
                                ))
                            }
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={toggleOpen}>
                                Close
                            </MDBBtn>
                            <MDBBtn onClick={issueBook}>Save changes</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </div>
    )
}
