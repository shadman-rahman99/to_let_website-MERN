import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { Modal, Alert } from 'react-bootstrap'
import { Button } from '@material-ui/core'
import { StarBorderOutlined, StarOutlined } from '@material-ui/icons'


const ViewTenantReviewModal = (props) => {

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
        <Modal.Body>
            <div>
              {
                props?.tenantReviews?.length !== 0
                ?(props?.tenantReviews?.map((review,i)=>(
                  <div key= {i} >
                    <span className='lead' >     
                    <p style={{cursor:'pointer', fontWeight:'bolder' }}>
                          {review?.ownerName}
                    </p> 
                     {review?.review}<br/>   
                     {
                  review?.rate === '1' && (
                    <><StarOutlined/><StarBorderOutlined/><StarBorderOutlined/><StarBorderOutlined/><StarBorderOutlined/> </>
                  )
                }
                                {
                  review?.rate === '2' && (
                    <> <StarOutlined/><StarOutlined/><StarBorderOutlined/><StarBorderOutlined/><StarBorderOutlined/> </>
                  )
                }
                                {
                  review?.rate === '3' && (
                    <> <StarOutlined/><StarOutlined/><StarOutlined/><StarBorderOutlined/><StarBorderOutlined/> </>
                  )
                }
                                {
                  review?.rate === '4' && (
                    <> <StarOutlined/><StarOutlined/><StarOutlined/><StarOutlined/><StarBorderOutlined/> </>
                  )
                }
                                {
                  review?.rate === '5' && (
                    <> <StarOutlined/><StarOutlined/><StarOutlined/><StarOutlined/><StarOutlined/> </>
                  )
                }
                    </span>
                    <hr/>
                  </div>
                  )))
                :(
                  <span className='lead' >No reviews posted </span>
                  )
              }
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

export default ViewTenantReviewModal
