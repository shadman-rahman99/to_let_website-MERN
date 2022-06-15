import React from 'react'
import { useSelector } from 'react-redux'
import { Grid } from '@material-ui/core'
import Post from './Post/Post'
import makeStyles from './style'

// ************************************************** //
// !  Backend and all logical functions disabled
// ************************************************** //

function Posts({ posts, setCurrentId}) {
    
    const { isLoading } = useSelector((state)=> state.posts)
    const classes = makeStyles() 

    if( !posts?.length && !isLoading) return <p className='lead'style={{color:'white'}}>No Post</p>
    return (
        isLoading 
        ? <p className='lead'style={{color:'white'}}>Loading...</p>
        : (
        <Grid className={classes.container } container
         alignItems='stretch' spacing={3}>
             {
                 posts?.map(post =>(
                    <Grid key={post._id} item xs={12} sm={6} md={4} lg={3} >
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                 ))
             }
        </Grid>
        )
    )
}

export default Posts