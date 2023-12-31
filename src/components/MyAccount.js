import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { base_url } from '../config';
import Book from './Book';
import { MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';

const MyAccount = () => {
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        fetchTransactions()

    }, [])

    const fetchTransactions = () => {
        const bearerToken = localStorage.getItem('token')

        axios.get(`${base_url}/transactions/all/`, {
            headers: {
                Authorization: `Bearer ${bearerToken}`,
            }
        }).then(data => setTransactions(data.data))
    }


    return (
        <MDBContainer fluid>
            <MDBRow >
                {
                    transactions.map(({ book, transactionType, dueDate}) => (
                        <MDBCol size='md' className='mt-2'>
                            <Book
                                author={book.author}
                                name={book.name}
                                status={transactionType}
                                dueDate={dueDate}
                            />
                        </MDBCol>
                    ))
                }
            </MDBRow>
        </MDBContainer>
    )
}

export default MyAccount