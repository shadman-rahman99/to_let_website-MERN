import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Popover, Divider, CardActions,CardContent, CardMedia, Button, Typography} from '@material-ui/core'


function PopoverModal(props) {

    const user = JSON.parse(localStorage.getItem('profile')) 
    const open = Boolean(props.anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const navigate = useNavigate()

    const openPost = (_id) => navigate(`/posts/${_id}`);

    

    return (
        <div>
            <Popover style={{ zIndex:'1' }} id={id} open={open} anchorEl={props.anchorEl} onClose={props.handleClose}
                anchorOrigin={{
                vertical: 'bottom', horizontal: 'left'}}
            >

                { (user?.result.googleId === props?.post.creator_id || user?.result._id === props?.post.creator_id) && (
                    <Button onClick={(e)=>{
                        e.stopPropagation()
                        props.handleClose()
                        props?.setCurrentId(props?.post._id)
                        }}>
                        <Typography style={{ margin:'3px', padding:'5px' }} sx={{ p: 2 }}>Edit post</Typography>
                    </Button>
                )}
                <Divider/>
                <Button onClick={()=>{
                    props.handleClose()
                    openPost(props?.post._id)
                }}>
                    <Typography style={{ margin:'3px', padding:'5px' }} sx={{ p: 2 }}>View post</Typography>
                </Button>                                
                <Divider/> 
                { (user?.result.googleId === props?.post.creator_id || user?.result._id === props?.post.creator_id) && (
                    <Button onClick={(e)=>{
                        props.SetModalShow(true)
                        props.setPost_id(props?.post?._id)
                        }}>
                        <Typography style={{ margin:'3px', padding:'5px' }} sx={{ p: 2 }}>Add Tenant</Typography>
                    </Button>
                )} 
            </Popover>
        </div>
    )
}

export default PopoverModal
