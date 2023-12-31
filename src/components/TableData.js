import React from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

export default function TableData({ name, author, borrowed_by, status }) {

    const showAction = () => {
        if (status == 'issued') {
            return "Take Back"
        } else {
            return <span onClick={()=> alert('Hello')}>Issue To</span>
        }
    }
    return (
        <MDBTable color='secondary' align='middle'>
            <MDBTableHead >
                <tr>
                    <th scope='col'>Name</th>
                    <th scope='col'>Status</th>
                    <th scope='col'>Borrowed To</th>
                    <th scope='col'>Actions</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
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
                        <MDBBadge color='success' pill>
                            {status}
                        </MDBBadge>
                    </td>
                    <td>{borrowed_by}</td>
                    <td>
                        <MDBBtn color='link' rounded size='sm'>
                            {showAction()}
                        </MDBBtn>
                    </td>
                </tr>


            </MDBTableBody>
        </MDBTable>
    );
}