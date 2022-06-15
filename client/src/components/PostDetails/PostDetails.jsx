import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'react-bootstrap'
import { Paper,CircularProgress, Divider, Button, Typography} from '@material-ui/core'
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import  CommentSection  from './CommentSection'
import { getPost, applyRequest } from '../../actions/post'
import { OWNER }  from '../../constants/actionTypes'
import makeStyles from './style'


function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Request Application Status
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Your request application has been successful. Please wait for the owner 
          to respond to your request.
        </p>
        <p>
          Your patience is highly appreciated, thank you.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function PostDetails() {
    const { post, isLoading } = useSelector((state)=> state.posts)
    const [modalShow, setModalShow] = React.useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const user = JSON.parse(localStorage.getItem('profile')) 
    // const recommendedPosts = posts.filter(({_id})=> _id !== post?._id )
    const classes = makeStyles()

    const notify =()=> toast('HEY');

    useEffect(() => {
        dispatch(getPost(id))
    }, [id])

    if(!post) return <p className='lead'style={{color:'white'}}>No Post</p>
    const thumbnail = post?.selectedImage_1 || post?.selectedImage_2 || post?.selectedImage_3 || post?.selectedImage_4
    
    const images = [post?.selectedImage_1,post?.selectedImage_2,post?.selectedImage_3,post?.selectedImage_4]
    // console.log(images);

    if(isLoading){
        return (
            <Paper className={classes.loadingPaper} elevation={6} >
                <CircularProgress size='7em' />
            </Paper>
        )
    }

    return (
      <>
     <Paper style={{ marginTop:'100px', padding:'20px', borderRadius:'15px' }} elevation={6} >
        <div className={classes.card}>
            <div className={classes.section}>
                <Typography variant="h3" component="h2">{post?.houseName}</Typography>
                <Typography variant="h6">Created by: {post?.creator_name}</Typography>
                <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                <Typography gutterBottom variant="h6" color="textSecondary" component="h2"></Typography>
                <Typography gutterBottom variant="body1" component="p">{post?.description}</Typography>
                {
                  user?.result.userType !== OWNER && (
                    <button className='mt-2 btn btn-primary'
                      onClick={()=>{ 
                        dispatch(applyRequest(post._id, user.result.name))
                        setModalShow(true)
                      }}
                    >
                      Request
                    </button>
                  ) 
                }
                <Divider style={{ margin: '20px 0' }} />
                <CommentSection post={post}/>
                <Divider style={{ margin: '20px 0' }} />
            </div>
            <div className={classes.imageSection}>
                {/* <img className={classes.media} src={thumbnail || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} /> */}
            </div>
        </div>
        {/* {post?.selectedImage_1 && (
        <div className={classes.section}>
          <Divider />
          <div className={classes.recommendedPosts}>
            {images.map(() => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                <img src={selectedFile} width="200px" />
              </div>
            ))}
          </div>
        </div>
      )} */}

        {
          post?.selectedImage_1 !== '' &&(
            <img className={classes.media} src={post?.selectedImage_1 || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
          )
        }
        {
          post?.selectedImage_2 !== '' &&(
            <img className={classes.media} src={post?.selectedImage_2 || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
          )
        }
        {
          post?.selectedImage_3 !== '' &&(
            <img className={classes.media} src={post?.selectedImage_3 || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
          )
        }
        {
          post?.selectedImage_4 !== '' &&(
            <img className={classes.media} src={post?.selectedImage_4 || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
          )
        }

        {/* <Grid className={classes.container } container
        alignItems='stretch' spacing={3}>
            {
                images.map((image)=> {
                  <Grid key={post._id} item xs={12} sm={6} md={4} lg={3} >
                  <img className={classes.media} src={image || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />

                  </Grid>
                }) 
            }
       </Grid>  */}

     </Paper>
        <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
        />      
     </>
    )
}

export default PostDetails
