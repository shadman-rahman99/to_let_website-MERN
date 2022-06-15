import React, { useState ,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { DeleteForever, EditRounded } from '@material-ui/icons'
import { Container, Grow, Typography, Grid, Paper, AppBar, TextField, Button, Divider } from '@material-ui/core'
import { getInfos, deleteUser } from '../../actions/post'
import makeStyles from './style'
import UpdateEmailModal from './UpdateEmailModal'


// ************************************************** //
// !  Backend and all logical functions disabled
// ************************************************** //

function AdminHome() {
    // currentId is the id of the post selected for updating.
    const [info, setInfo] = useState()
    const [modalShow, setModalShow] = useState(false);
    const [prevEmail, setPrevEmail] = useState(null)
    const [userId, setUserId] = useState(null)
    const dispatch = useDispatch() 
    const user = JSON.parse(localStorage.getItem('profile')) 
    const classes = makeStyles()
    
    const owners = info?.owners
    const posts = info?.posts
    const tenants = info?.tenants
    const tenantReviews = info?.tenantReviews

    useEffect(() => {
       dispatch(getInfos(setInfo))
    }, [dispatch])

    return (
        <div>
            <Container style={{marginTop:'70px'}} maxWidth='xl'>
                <section className="bg-dark text-light">
                    <div className="p-5">
                    <>
                        <h2>Tenants </h2>
                        { tenants?.length !== 0 ? (
                            <div style={{ height: '150px', overflowY: 'auto', marginRight: '30px'}} >
                                {
                                    tenants?.map((tenant)=>( 
                                        <>
                                            <div key={tenant?._id} className='d-flex align-items-center justify-content-between'>
                                                <span className='lead' >     
                                                    {tenant?.name}<br/>{tenant?.email}
                                                </span>
                                                <div>
                                                    <EditRounded className='me-2' size='small' color='primary'
                                                        onClick={()=>{
                                                            setPrevEmail(tenant?.email)
                                                            setUserId(tenant?._id)
                                                            setModalShow(true)
                                                        }}
                                                    >
                                                        <Typography style={{ margin:'1px' }} sx={{ p: 2 }}> Edit </Typography>
                                                    </EditRounded>
                                                    <DeleteForever size='small' color='secondary'
                                                        onClick={()=>{
                                                            dispatch(deleteUser(tenant._id))
                                                            setTimeout(() => {
                                                                window.location.reload()
                                                            }, 3000);
                                                        }}
                                                    >
                                                        <Typography style={{ margin:'1px' }} sx={{ p: 2 }}> Remove </Typography>
                                                    </DeleteForever>
                                                </div>
                                            </div>
                                            <hr/>
                                        </>
                                    ))
                                }
                            </div>  
                            ) : <span className='lead'>No Tenant</span>
                        }
                    </>
                    </div>
                </section><br/>

                <section className="bg-dark text-light">
                    <div className="p-5">
                    <>
                        <h2>Owners </h2>
                        { owners?.length !== 0 ? (
                            <div style={{ height: '150px', overflowY: 'auto', marginRight: '30px'}} >
                                {
                                    owners?.map((owner)=>( 
                                        <>
                                            <div key={owner?._id} className='d-flex align-items-center justify-content-between'>
                                                <span className='lead' >     
                                                    {owner?.name}<br/>{owner?.email}
                                                </span>
                                                <div>
                                                    <EditRounded className='me-2' size='small' color='primary'
                                                        onClick={()=>{
                                                            setUserId(owner?._id)
                                                            setPrevEmail(owner?.email)
                                                            setModalShow(true)
                                                        }}
                                                    >
                                                        <Typography style={{ margin:'1px' }} sx={{ p: 2 }}> Edit </Typography>
                                                    </EditRounded>
                                                    <DeleteForever size='small' color='secondary'
                                                        onClick={()=>{
                                                           dispatch(deleteUser(owner._id))
                                                            setTimeout(() => {
                                                                window.location.reload()
                                                            }, 3000);
                                                        }}
                                                    >
                                                        <Typography style={{ margin:'1px' }} sx={{ p: 2 }}> Remove </Typography>
                                                    </DeleteForever>
                                                </div>
                                            </div>
                                            <hr/>
                                        </>
                                    ))
                                }
                            </div>  
                            ) : <span className='lead'>No Owner</span>
                        }
                    </>
                    </div>
                </section><br/>

                <section className="bg-dark text-light">
                    <div className="p-5">
                    <>
                        <h2>Tenant Reviews</h2>
                        { tenantReviews?.length !== 0 ? (
                            <div style={{ height: '150px', overflowY: 'auto', marginRight: '30px'}} >
                                {
                                    tenantReviews?.map((tenantReview)=>( 
                                        <>
                                            <div key={tenantReview?._id} className='d-flex align-items-center justify-content-start'>
                                                <span className='lead' >     
                                                    {tenantReview?.ownerName} to {tenantReview?.tenantName} : {tenantReview?.review}
                                                </span>
                                            </div>
                                             <span className='lead' >     
                                                Rating: {tenantReview?.rate}
                                            </span>
                                            <hr/>
                                        </>
                                    ))
                                }
                            </div>  
                            ) : <span className='lead'>No Reviews</span>
                        }
                    </>
                    </div>
                </section><br/>

                <section className="bg-dark text-light">
                    <div className="p-5">
                    <>
                        <h2>Post Reviews </h2>
                        { posts?.length !== 0 ? (
                            <div style={{ height: '150px', overflowY: 'auto', marginRight: '30px'}} >
                                {
                                    posts?.map((post)=>( 
                                        post?.revAndRate?.map(rev => (
                                            <>
                                                <div key={post?._id} className='d-flex align-items-center justify-content-start'>
                                                    <span className='lead' >     
                                                        {rev?.tenantName} to {post?.houseName} : {rev?.review}
                                                    </span>
                                                </div>
                                                 <span className='lead' >     
                                                    Rating: {rev?.rate}
                                                </span>
                                                <hr/>
                                            </>
                                        ))
                                    ))
                                }
                            </div>  
                            ) : <span className='lead'>No Reviews</span>
                        }
                    </>
                    </div>
                </section>

                <UpdateEmailModal userId={userId} prevEmail={prevEmail} show={modalShow}
                    onHide={() =>{ setModalShow(false)}}
                />
            </Container>
        </div>
    )
}

export default AdminHome
