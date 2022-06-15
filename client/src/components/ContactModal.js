import React from 'react'
import { Modal } from 'react-bootstrap'
import { Button, Typography } from '@material-ui/core'
import { LocationCity, Phone, Mail } from '@material-ui/icons'

const ContactModal = (props) => {
    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Contact Us
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
            <div className='d-flex align-items-center justify-content-start p-3'>
              <LocationCity className='me-3'/>
              <Typography variant="h6"> Lalbagh, Dhaka, Bangladesh </Typography>
            </div>
            <div className='d-flex align-items-center justify-content-start p-3'>
              <Phone className='me-3'/>
              <Typography variant="h6"> +880162853457 </Typography>
            </div>
            <div className='d-flex align-items-center justify-content-start p-3'>
              <Mail className='me-3'/>
              <Typography variant="h6"> tsftousif2@gmail.com </Typography>
            </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    )
}

export default ContactModal
