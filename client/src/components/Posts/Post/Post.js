import * as React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Card, CardActions,CardContent, CardMedia, Button, Typography} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { StarBorderOutlined, StarOutlined } from '@material-ui/icons'
import moment from 'moment'
import { deletePost } from '../../../actions/post'
import AddTenantModal from './AddTenantModal'
import PopoverModal from './PopoverModal'
import makeStyles from './style'

// ************************************************** //
// !  Backend and all logical functions disabled
// ************************************************** //


function Post({post, setCurrentId }){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [modalShow, setModalShow] = React.useState(false);
    const [post_id, setPost_id] = React.useState(null)
    const user = JSON.parse(localStorage.getItem('profile')) 
    const classes = makeStyles()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // ************************** Calculating Average Ratings****************** //
    let allRates = 0
    let avgrate = 0 
    if(post?.revAndRate.length !== 0){
        post?.revAndRate?.map(rate=>{
            allRates+=parseInt(rate?.rate)
        })
        avgrate=allRates/post?.revAndRate?.length
    }else{
        avgrate='No Ratings'
    }
    // ************************** ************************** ****************** //

    const thumbnail = post?.selectedImage_1 || post?.selectedImage_2 || post?.selectedImage_3 || post?.selectedImage_4

    return (
        <>
             <Card  className={classes.card} raised elevation={6} >
                <CardMedia className={classes.media} image={thumbnail} title={post?.houseName}/>
                <div className={classes.overlay}>
                    <Typography variant='h6'>
                        {post?.creator_name}
                    </Typography>
                    <Typography variant='body2' > 
                        { post.createdAt ? moment(post?.createdAt).fromNow() : 'Few days ago...' }
                     </Typography>
                </div>
                <div className={classes.overlay2}>
                    <Button style={{color:"white"}} size='small' onClick={handleClick}>
                        <MoreHorizIcon fontSize='large' />
                    </Button>
                </div>
                <Typography className={classes.title} variant='h4' color='textPrimary'> 
                    {post?.houseName} 
                </Typography>
                <Typography className={classes.title} variant='h6' color='textPrimary'> 
                    {post?.rentFee} 
                </Typography>
                <div className='d-flex align-items-center justify-content-start' >
                    <Typography className={classes.title} variant='body2' color='textSecondary'> 
                            {post?.location} 
                    </Typography>
                    <Typography className={classes.title} variant='body2' color='textSecondary'> 
                            {avgrate}
                            {/* { post?.revAndRate }  */}
                    </Typography>
                    {/* <StarBorderOutlined style={{marginBottom:'3px'}} fontSize='small' /> */}
                    {
                  (avgrate === 1 ) && (
                    <><StarOutlined/><StarBorderOutlined/><StarBorderOutlined/><StarBorderOutlined/><StarBorderOutlined/> </>
                  )
                }
                                {
                  (avgrate === 2 ) && (
                    <> <StarOutlined/><StarOutlined/><StarBorderOutlined/><StarBorderOutlined/><StarBorderOutlined/> </>
                  )
                }
                                {
                  (avgrate === 3 ) && (
                    <> <StarOutlined/><StarOutlined/><StarOutlined/><StarBorderOutlined/><StarBorderOutlined/> </>
                  )
                }
                                {
                  (avgrate === 4 ) && (
                    <> <StarOutlined/><StarOutlined/><StarOutlined/><StarOutlined/><StarBorderOutlined/> </>
                  )
                }
                                {
                  (avgrate === 5 ) && (
                    <> <StarOutlined/><StarOutlined/><StarOutlined/><StarOutlined/><StarOutlined/> </>
                  )
                }
                </div>
                <CardContent>
                    <Typography variant='body2' color='textSecondary'> 
                        {post?.description} 
                    </Typography>
                </CardContent>
                <CardActions className={classes.cardAction}>
                    {
                        (user?.result.googleId === post?.creator_id || user?.result._id === post?.creator_id) && (
                            <Button size='small' color='primary'
                            onClick={()=>{ dispatch(deletePost(post._id)) }} 
                            >
                                <DeleteIcon fontSize='small' />
                            </Button>
                        )
                    }
                </CardActions>
            </Card>
            <AddTenantModal post_id={post_id} show={modalShow} onHide={() =>{ 
                handleClose()
                setPost_id(null)
                setModalShow(false)}}
            />
            <PopoverModal setPost_id={setPost_id} post={post} setCurrentId={setCurrentId}  anchorEl={anchorEl} handleClick={handleClick} handleClose={handleClose} SetModalShow={setModalShow} />
        </>
    )
}

export default Post