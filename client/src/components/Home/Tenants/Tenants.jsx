import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Container, Grow, Typography, Grid, Paper, AppBar, TextField, Button, Divider } from '@material-ui/core'
import { DeleteForever, RateReview } from '@material-ui/icons'
import { acceptRequest, deleteRequest, getTenantReviews, removeTenant } from '../../../actions/post'
import ReviewTenantModal from './ReviewTenantModal'
import ReviewPostModal from './ReviewPostModal'
import ViewTenantReviewModal from './ViewTenantReviewModal'
import { OWNER, TENANT } from '../../../constants/actionTypes'

function Tenants({tenantRequests, myTenants, myRents}) {

    const [tenantId, setTenantId] = useState(null)
    const [tenantName, setTenantName] = useState(null)
    const [postId, setPostId] = useState(null)
    const [tenantReviews, setTenantReviews] = useState(null)
    const [modalShow, setModalShow] = React.useState(false);
    const [postRevShow, setPostRevShow] = useState(null)
    const [viewTenantRev_Modal, setViewTenantRev_Modal] = React.useState(false);
    const dispatch = useDispatch()

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    return (
        <div>
            <Container maxWidth='xl'>
                    <section className="bg-dark text-light">
                        <div className="p-5">
                            
                            {
                                (user?.result?.userType == OWNER ) ? (
                                    <>
                                        <h2>Tenant Request</h2>
                                        { tenantRequests?.length !== 0 ? (
                                            <div style={{ height: '150px', overflowY: 'auto', marginRight: '30px'}} >
                                                {
                                                    tenantRequests?.map((post)=>(   
                                                        post?.tenant_req.map((req,i)=>(
                                                            <>
                                                            <div key={i} className='d-flex align-items-center justify-content-between'>
                                                                <span className='lead' >     
                                                                    {post?.houseName}
                                                                    <p style={{cursor:'pointer', fontWeight:'bolder' }} 
                                                                        onClick={()=> {
                                                                            setViewTenantRev_Modal(true)
                                                                            dispatch(getTenantReviews(req?.id,setTenantReviews))
                                                                            console.log(tenantReviews);
                                                                        }}
                                                                    >
                                                                        {req?.name}
                                                                    </p> 
                                                                    
                                                                </span>
                                                                <div>
                                                                    <button type="button" className="m-2 btn btn-primary"
                                                                        onClick={()=>{
                                                                            dispatch(acceptRequest(post._id, req?.id, req?.name))
                                                                            setTimeout(() => {
                                                                                window.location.reload()
                                                                            }, 2000);
                                                                            // dispatch(getPosts())
                                                                        }}
                                                                    >
                                                                        <Typography style={{ margin:'1px' }} sx={{ p: 2 }}> Accept </Typography>
                                                                    </button>
                                                                    <button type="button" className="m-2 btn btn-danger"
                                                                        onClick={()=>{
                                                                            dispatch(deleteRequest(post._id, req?.id))
                                                                            setTimeout(() => {
                                                                                window.location.reload()
                                                                            }, 2000);
                                                                        }}
                                                                    >
                                                                        <Typography style={{ margin:'1px' }} sx={{ p: 2 }}> Reject </Typography>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <hr/>
                                                        </>

                                                        ))
                                                        
                                                    ))
                                                }
                                            </div>  
                                            ) : <span className='lead'>No Request</span>
                                        }
                                    </>
                                ):null
                            }
                            {
                                (user?.result?.userType === OWNER ) ? (
                                    <>
                                    <h2> My Tenants </h2>
                                    {
                                        myTenants?.length !==0 ? (
                                            <div style={{ height: '150px', overflowY: 'auto', marginRight: '30px'}} >
                                                {
                                                    myTenants.map((post)=>(
                                                    
                                                        post?.tenant.map((req)=>(
                                                            <>
                                                            <div key={req?.id} className='d-flex align-items-center justify-content-between'>
                                                                <span className='lead' >     
                                                                    {post?.houseName}
                                                                    <p style={{cursor:'pointer' }}>
                                                                        {req?.name}
                                                                    </p> 
                                                                </span>
                                                                <div>
                                                                    <Button size='small' color='primary'
                                                                        onClick={()=>{ 
                                                                            setModalShow(true) 
                                                                            setTenantId(req?.id)
                                                                            setTenantName(req?.name)
                                                                        }} 
                                                                    >
                                                                        <RateReview/>
                                                                    </Button>
                                                                    <Button size='small' color='secondary'
                                                                           onClick={()=>{ 
                                                                            dispatch(removeTenant(post?._id))
                                                                            setTimeout(() => {
                                                                                window.location.reload()
                                                                            }, 2000);
                                                                        }} 
                                                                    >
                                                                        <DeleteForever/>
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                            <hr/>
                                                            </>

                                                        ))
                                                        
                                                    ))
                                                }
                                            </div>  
                                        ): <span className='lead'>No Tenant</span>
                                    }
                                    </>
                                ):null
                            }
                            {
                                (user?.result?.userType === TENANT ) ? (
                                    <>  
                                    <h2> My Rents </h2>
                                    {
                                        myRents?.length !== 0 ? (
                                            <div style={{ height: '200px', overflowY: 'auto', marginRight: '30px'}} >
                                                {
                                                    myRents?.map((post)=>(
                                                        post?.tenant.map((req)=>(
                                                            <>
                                                            <div key={req?.id} className='d-flex align-items-center justify-content-between'>
                                                                <span className='lead' >     
                                                                    {post?.houseName}
                                                                    <p style={{cursor:'pointer' }}>
                                                                        {req?.name}
                                                                    </p> 
                                                                </span>
                                                                <div>
                                                                    <Button size='small' color='primary'
                                                                        onClick={()=>{ 
                                                                            setPostRevShow(true) 
                                                                            setPostId(post?._id)
                                                                        }} 
                                                                    >
                                                                        <RateReview/>
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                            <hr/>
                                                            </>

                                                        ))
                                                        
                                                    ))
                                                }
                                            </div>
                                        ): <span className='lead'>No Rent</span>
                                    }
                                    </>
                                ):null
                            }
                        </div>
                    </section>
                    <ReviewTenantModal tenantName={tenantName} tenantId={tenantId} show={modalShow}
                        onHide={() =>{ setModalShow(false)}}
                    />
                    <ReviewPostModal postId = {postId} show={postRevShow} 
                        onHide={() =>{ setPostRevShow(false)}}
                    />
                    {
                        user?.result?.userType == OWNER &&(
                            <ViewTenantReviewModal tenantReviews={tenantReviews} show = {viewTenantRev_Modal} 
                            onHide={() =>{ setViewTenantRev_Modal(false)}}
                        />
                        )
                    }
            </Container>
        </div>
    )
}

export default Tenants
