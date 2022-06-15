import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { Modal, Alert } from 'react-bootstrap'
import { Button } from '@material-ui/core'
import { createPostReview } from '../../../actions/post'



const ReviewPostModal = (props) => {

  const initialPostData = { tenantId:'', tenantName:'', review:'', rate:'', postId:'' }
  const [postData, setPostData] = useState(initialPostData)
  const [error, setError] = useState('')      
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile')) 
    
  useEffect(() => {
    setPostData(initialPostData)    
    setError('')
  }, [props?.show])

  const handleSubmit = (e)=>{
    e.preventDefault();
    setError('')
    if(postData.review === '' || postData.rate === '') return setError('Please enter all the information')
    // console.log(postData);
    dispatch(createPostReview(postData))
    props?.onHide()
  }

      const tenant_id = user?.result?._id ? user?.result?._id : user?.result?.googleId

      return (
          <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Write a Review
          </Modal.Title>
        </Modal.Header>
        {error && <Alert className='d-flex justify-content-center' variant="danger" > {error} </Alert>} 
        <Modal.Body>
          <div>
              <form onSubmit={handleSubmit} >
                      <div className="form-group">
                          <textarea onChange={(e)=> setPostData({...postData, review: e.target.value, tenantId:tenant_id, tenantName: user?.result?.name, postId: props?.postId })} placeholder='Review' className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                      </div>

                      <fieldset className="form-group">
                          <div className="row">
                          <legend className="col-form-label col-sm-2 pt-0">Rate</legend>
                          <div className="col-sm-10">
                              <div className="form-check">
                              <input onChange={(e)=> setPostData({...postData, rate: e.target.value})} className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="1" />
                              <label className="form-check-label" htmlFor="gridRadios1">
                                  1 Star
                              </label>
                              </div>
                              <div className="form-check">
                              <input onChange={(e)=> setPostData({...postData, rate: e.target.value})} className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="2"/>
                              <label className="form-check-label" htmlFor="gridRadios2">
                                  2 Stars
                              </label>
                              </div>
                              <div className="form-check">
                              <input onChange={(e)=> setPostData({...postData, rate: e.target.value})} className="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="3"/>
                              <label className="form-check-label" htmlFor="gridRadios3">
                                  3 Stars
                              </label>
                              </div>
                              <div className="form-check">
                              <input onChange={(e)=> setPostData({...postData, rate: e.target.value})} className="form-check-input" type="radio" name="gridRadios" id="gridRadios4" value="4"/>
                              <label className="form-check-label" htmlFor="gridRadios4">
                                  4 Stars
                              </label>
                              </div>
                              <div className="form-check">
                              <input onChange={(e)=> setPostData({...postData, rate: e.target.value})} className="form-check-input" type="radio" name="gridRadios" id="gridRadios5" value="5"/>
                              <label className="form-check-label" htmlFor="gridRadios5">
                                  5 Stars
                              </label>
                              </div>
                          </div>
                          </div>
                      </fieldset>

                      <div className="form-group row">
                          <div className="col-sm-10">
                          <button type="submit" className="btn btn-primary">Submit Review</button>
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

export default ReviewPostModal
