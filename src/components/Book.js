import React from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn,
    MDBRipple
} from 'mdb-react-ui-kit';

export default function Book({ author, name, status, dueDate=null }) {
    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
      
        const day = String(date.getDate()).padStart(2, '0');
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
      
        return `${day} ${month} ${year} ${hours}:${minutes}`;
      }
    return (
        <MDBCard className='p-2' style={{ height: 350, width: 250 }}>
            <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                <MDBCardImage height={200} width={"90%"} src='https://mdbootstrap.com/img/new/standard/nature/111.webp' fluid alt='...' />
                <a>
                    <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                </a>
            </MDBRipple>
            <MDBCardBody>
                <MDBCardTitle>{name}</MDBCardTitle>
                <MDBCardText>{author}</MDBCardText>
                {
                    dueDate && <MDBCardText>{formatTimestamp(dueDate)}</MDBCardText>
                }
                <MDBBtn href='#' disabled={status == 'issued'} >{status}</MDBBtn>
            </MDBCardBody>
        </MDBCard>
    );
}