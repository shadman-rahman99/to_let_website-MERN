import React, {useState, useEffect} from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Button, Typography } from '@material-ui/core'
import { getTenants,acceptRequest } from '../../../actions/post'



const AddTenantModal = (props)=> {

  const [tenants, setTenants] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    if(props?.post_id)return dispatch(getTenants(setTenants))
  }, [props?.post_id, dispatch])
  // console.log(tenants);
  return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Adding tenant...
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Choose a tenant</h4>
          {
            tenants?.length !== 0 && (
              tenants?.map((tenant, i)=>(
                <p className='lead' key={i} style={{cursor:'pointer'}} 
                onClick={()=> {
                  dispatch(acceptRequest(props?.post_id, tenant?._id, tenant?.name))
                  props?.onHide()
                  setTimeout(() => {
                    window.location.reload()
                  }, 2000);
                }}>
                  {tenant?.name}
                </p>
              ))
            )
          }
          </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
}

export default AddTenantModal
