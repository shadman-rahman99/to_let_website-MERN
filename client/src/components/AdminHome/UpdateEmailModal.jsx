import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { Modal, Alert } from 'react-bootstrap'
import { Button } from '@material-ui/core'
import { updateEmail } from '../../actions/post'



const UpdateEmailModal = (props) => {

const initialPostData = { userId:props?.userId, prevEmail:props?.prevEmail, newEmail:'' }
const [postData, setPostData] = useState(initialPostData)
const [error, setError] = useState('')      
const [refresh, setRefresh] = useState(false)
const dispatch = useDispatch()
const user = JSON.parse(localStorage.getItem('profile')) 
    
  useEffect(() => {
    setPostData(initialPostData)    
    setError('')
  }, [props?.show])

  const handleSubmit = (e)=>{
    e.preventDefault();
    setError('')
    if(postData.newEmail === '') return setError('Please enter all the information')
    dispatch(updateEmail(postData,setRefresh))
    props?.onHide()
    setTimeout(() => {
        window.location.reload()
    }, 3000);

  }

    //   const tenant_id = user.result._id ? user.result._id : user.result.googleId

      return (
          <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update Email
          </Modal.Title>
        </Modal.Header>
        {error && <Alert className='d-flex justify-content-center' variant="danger" > {error} </Alert>} 
        <Modal.Body>
          <div>
              <form onSubmit={handleSubmit} >
                      <div className="form-group">
                          <textarea onChange={(e)=> setPostData({...postData, newEmail: e.target.value })} placeholder='Email' className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                      </div>
                      <div className="form-group row">
                          <div className="col-sm-10">
                          <button type="submit" className="btn btn-primary">Submit</button>
                          </div>
                      </div>
                  </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            onClick={()=>{
              props.onHide()
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

  )
}

export default UpdateEmailModal
