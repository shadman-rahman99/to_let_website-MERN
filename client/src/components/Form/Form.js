import React, { useState, useEffect } from 'react'
import FileBase from 'react-file-base64'
import { useNavigate } from 'react-router-dom'
import { Alert } from 'react-bootstrap'
import { TextField, Button, Typography, Paper} from '@material-ui/core'
import { AddAPhotoRounded, RemoveCircleOutline } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../../actions/post'
import makeStyles from './style'

function Form({ setPostCreation, currentId, setCurrentId }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState('')      
    const [postData, setPostData] = useState({
        houseName: '', location: '', rentFee: '', description: '', selectedImage_1: '',selectedImage_2: '',
        selectedImage_3: '',selectedImage_4: ''
    })
    const post = useSelector((state)=> currentId ? state.posts.posts.find((p)=> p._id === currentId) : null)
    const classes = makeStyles()
    const user = JSON.parse(localStorage.getItem('profile'))

    useEffect(() => {
        if(post) setPostData(post)
        // running this useEffect whenever post variable changes. Initially 
        // its null but when user clicks edit post button we call setCurrentId()
        // function in ReviewModal.js which sets a value for variable currentId.
        // Finally post variable contains data which triggers this useEffect.
        // postData is all set and the Form fills up with the existing post's data. 
    }, [post])

    const handleSubmit = (e)=>{
        e.preventDefault();
        const Format = /^\d*$/
        if(!(postData.rentFee.match(Format))) return setError('Invalid Rental Fee ')
        if(currentId){
            dispatch(updatePost(currentId, postData))
            setPostCreation(true)
        }else{
            dispatch(createPost({...postData, creator_name: user?.result.name }, setError ))   
            setPostCreation(true)
        }
        clear()
    }
    const clear= ()=> {
        setCurrentId(null)
        // setting all postData value to empty string
        setPostData({ houseName: '', location: '', rentFee: '', description: '', selectedImage_1: '',selectedImage_2: '',
        selectedImage_3: '',selectedImage_4: ''})
    }

    return (
        <Paper className={classes.paper} elevation={6} >
            {error && <Alert className='d-flex justify-content-center' variant="danger" > {error} </Alert> }
            <form autoComplete='off' className={classes.root,classes.form} onSubmit={handleSubmit}>

            <Typography variant="h6">
                    { currentId? `Editing`: `Add`} a Room
            </Typography>

            <TextField className='m-1' name='houseName' variant='outlined' required label='House Name'
             fullWidth value={postData?.houseName} 
             onChange={(e)=> 
                setPostData({...postData, houseName: e.target.value})}
             >
            </TextField>

            <TextField className='m-1' name='location' variant='outlined' label='Location'
             fullWidth required
             value={postData?.location} 
             onChange={(e)=> 
                   setPostData({...postData, location: e.target.value})
            }
            >
            </TextField>

            <TextField className='m-1' name='details' variant='outlined' label='Details'
             fullWidth required
             value={postData?.description} 
             onChange={(e)=> 
                setPostData({...postData, description: e.target.value})
            }
            >
            </TextField>
            
            <TextField className='m-1' name='rentFee' variant='outlined' label='Rent fee'
             fullWidth required
             value={postData?.rentFee} 
             onChange={(e)=> 
                setPostData({...postData, rentFee: e.target.value})
            }
            >
            </TextField>

            <div className={classes.fileInput}>
                <Button style={ postData.selectedImage_1? {display:'none'}: {display:''} } >
                        <FileBase type="file" multiple={false} 
                        onDone={(base64,e)=> {
                            setPostData({...postData, selectedImage_1:base64.base64})
                    }}/>
                </Button>
                {   
                    postData.selectedImage_1 && (
                        <div>
                            <span className='lead text-success'>Image Added</span>
                            <Button onClick={()=>{
                            setPostData({...postData, selectedImage_1:''})
                        }} >   
                           <RemoveCircleOutline />
                        </Button>
                        </div>
                    )
                }
            </div>
            <div className={classes.fileInput}>
                <Button style={ postData.selectedImage_2? {display:'none'}: {display:''} } >
                        <FileBase type="file" multiple={false} 
                        onDone={(base64,e)=> {
                            setPostData({...postData, selectedImage_2:base64.base64})
                }}/>
                </Button>
                {   
                    postData.selectedImage_2 && (
                        <div>
                            <span className='lead text-success'>Image Added</span>
                            <Button onClick={()=>{
                            setPostData({...postData, selectedImage_2:''})
                        }} >   
                           <RemoveCircleOutline className='me-2'/>
                        </Button>
                        </div>
                    )
                }
            </div>
            <div className={classes.fileInput}>
                <Button style={ postData.selectedImage_3? {display:'none'}: {display:''} } >
                        <FileBase type="file" multiple={false} 
                        onDone={(base64,e)=> {
                            setPostData({...postData, selectedImage_3:base64.base64})
                }}/>
                </Button>
                {   
                    postData.selectedImage_3 && (
                        <div>
                            <span className='lead text-success'>Image Added</span>
                            <Button onClick={()=>{
                            setPostData({...postData, selectedImage_3:''})
                        }} >   
                           <RemoveCircleOutline className='me-2'/>
                        </Button>
                        </div>
                    )
                }
            </div>
            <div className={classes.fileInput}>
                <Button style={ postData.selectedImage_4? {display:'none'}: {display:''} } >
                        <FileBase type="file" multiple={false} 
                        onDone={(base64,e)=> {
                            setPostData({...postData, selectedImage_4:base64.base64})
                }}/>
                </Button>
                {   
                    postData.selectedImage_4 && (
                        <div>
                            <span className='lead text-success'>Image Added</span>
                            <Button onClick={()=>{
                            setPostData({...postData, selectedImage_4:''})
                        }} >   
                           <RemoveCircleOutline className='me-2'/>
                        </Button>
                        </div>
                    )
                }
            </div>

            <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth 
                onClick={()=>{
                    setError('')
                }} 
            >
                Submit
            </Button>
            <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form
