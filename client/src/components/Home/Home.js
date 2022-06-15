import React, { useState ,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { Container, Grow, Typography, Grid, Paper, AppBar, TextField, Button, Divider } from '@material-ui/core'
import ChipInput from 'material-ui-chip-input'
import axios from 'axios'
import Posts from '../Posts/Posts'
import Form from  '../Form/Form'
import { getPosts } from '../../actions/post'
import makeStyles from './style'
import Tenants from './Tenants/Tenants'
import { OWNER, TENANT } from '../../constants/actionTypes'

// ************************************************** //
// !  Backend and all logical functions disabled
// ************************************************** //

function Home() {
    // currentId is the id of the post selected for updating.
    const [currentId, setCurrentId] = useState(null)
    const [postCreation, setPostCreation] = useState(false)
    const dispatch = useDispatch() 
    const navigate = useNavigate()
    // Here posts in state.posts is coming from the function, 
    // combineReducers({posts}) in index.js in reducer folder. 
    const user = JSON.parse(localStorage.getItem('profile')) 
    const {posts } = useSelector((state)=> state.posts)
    const classes = makeStyles()
    // console.log(isLoading, posts);

    var allRooms = user?.result?.userType === OWNER ? (
        user?.result?.googleId 
        ? (posts.filter(({creator_id})=> creator_id !== user?.result?.googleId))
        : posts.filter(({creator_id})=> creator_id !== user?.result?._id) 
    ) : (
        posts.filter(({tenant})=> tenant.length === 0 )
    )
    allRooms = user?.result?.userType === OWNER
    ? allRooms.filter(({tenant})=> tenant.length === 0 ) : allRooms
    console.log('All Rooms: ',allRooms);

    const myRooms = user?.result?.googleId 
    ? (posts.filter(({creator_id})=> creator_id === user?.result?.googleId))
    : posts.filter(({creator_id})=> creator_id === user?.result?._id) 
    console.log('My Rooms : ', myRooms);

    const tenantRequests = myRooms.filter(({tenant_req})=> tenant_req.length !== 0)
    console.log('Tenant Request : ',tenantRequests);

    const myTenants = myRooms.filter(({tenant})=> tenant.length !== 0)
    console.log('My Tenants : ',myTenants);

    var myRents_Arr = []
    let myRents = user?.result?.userType === TENANT
    ? user?.result?.googleId
    ?posts.filter(({tenant})=> tenant.length !== 0) 
    :posts.filter(({tenant})=> tenant.length !== 0) 
    : null

    if(user?.result?.googleId){
        myRents?.map((post)=>{
            if(post?.tenant[0].id === user?.result?.googleId) return myRents_Arr.push(post)
        })
        
    }
    if(user?.result?._id){
        myRents?.map((post)=>{
            if(post?.tenant[0].id === user?.result?._id) return myRents_Arr.push(post)
        })
        
    }

    console.log('My Rents Array : ',myRents_Arr);
    console.log('My Rents : ',myRents);


    useEffect(() => {
       dispatch(getPosts())
    }, [ postCreation==true, dispatch])

    // *************************** Registering ChatEngine Users ************************* //

    const getFile = async(url)=>{
        const response = await fetch(url)
        .then(()=>console.log("fetch successful"))
        .catch((error)=>console.log("fetch error: ",error));
        const data = await response?.blob()
        // returning files with an array where each object inside are specified
        //  as data. Setting the file name as userphoto.jpg and lastly type of the 
        // image is set to jpeg.
        return new File([data], "userPhoto.jpg", { type: 'image/jpeg'})
    }
    const REACT_APP_CHAT_ENGINE_ID = 'ba3d3e53-c774-41ac-b629-493ac186f82f'
    const REACT_APP_CHAT_ENGINE_KEY = '740a0a65-3af9-45d2-817c-9f01fd79d74b'

    useEffect(() => {
   
        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "project-id": REACT_APP_CHAT_ENGINE_ID,
                "user-name": user?.result?.email,
                "user-secret": user?.result?._id
            }
        })
        .then(()=>{
            // setLoading(false)
        })
        .catch((error)=>{
            // creating user if there is no existing user
            console.log("Axios get error :",error, "\n",error.response.data)
            let formdata = new FormData()
            formdata.append('email',user?.result?.email);
            formdata.append('username', user?.result?.email);
            formdata.append('secret', user?.result?._id);
            
            getFile(user?.photoURL).then((avatar)=>{
                axios.post('https://api.chatengine.io/users/',
                    formdata,
                    {headers: {"private-key": REACT_APP_CHAT_ENGINE_KEY }}
                ).catch((error)=> console.log("Axios post error :",error, "\n",error.response.data))
            })
        })
    }, [user,navigate])
    // ********************************************************************************************* //

    return (
        <div>
                <br id='allRooms'/>
                <Grow in>
                    <Container style={{marginTop:'70px'}} maxWidth='xl'>
                            <div className='mb-3' >
                                <Posts posts={allRooms} setCurrentId={setCurrentId}/>
                            </div>
                    </Container>
                </Grow>
            
                {   
                    user?.result?.userType == OWNER && (
                        <>
                        <br id='myRooms'/><br/>
                        <Container maxWidth='xl'>
                            <div className='mb-3' >
                                <Posts posts={myRooms} setCurrentId={setCurrentId}/>
                            </div>
                        </Container>
                        <br id="addRoom"/><br/>
                            <Form setPostCreation={setPostCreation} currentId={currentId} setCurrentId={setCurrentId} /> 
                        </>
                    )
                }
                <br id="tenants"/><br/>
                {
                    user?.result?.userType === OWNER
                    ?<Tenants tenantRequests={tenantRequests} myTenants= {myTenants} />
                    :<Tenants myRents= {myRents_Arr} />
                }
        </div>
    )
}

export default Home
