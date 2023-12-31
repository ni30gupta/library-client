import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { base_url } from '../config';
import axios from 'axios';
import Book from './Book';
import { MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';


const Library = () => {
    const [books, setBooks] = useState([])
    useEffect(() => {
        checkToken()
        fetchBooks()
    }, [])

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
    
    return (
        <MDBContainer fluid>
            <MDBRow >
                {
                    books.map(({ author, name, status }) => (
                        <MDBCol size='md' className='mt-2'>
                            <Book
                                author={author}
                                name={name}
                                status={status}
                            />
                        </MDBCol>
                    ))
                }
            </MDBRow>
        </MDBContainer>
    )
}

export default Library