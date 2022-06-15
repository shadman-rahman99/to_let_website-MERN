import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Typography, TextField, Button } from '@material-ui/core'
import { StarBorderOutlined, StarOutlined } from '@material-ui/icons'

import makeStyles from './style'

const CommentSection = ({ post })=> {

    const user = JSON.parse(localStorage.getItem('profile'))
    const classes = makeStyles()
    // const showRate = (rate)=>{
    //   if(rate === '1')return()
    // }
    return (
  
        post?.revAndRate?.length !== 0
        ?(
          <div className={classes.commentsOuterContainer}>
          <div className={classes.commentsInnerContainer}>
          <Typography variant="h6">Reviews</Typography>
            { 
              post?.revAndRate?.map((r, i) => (
              <>
              <Typography key={i} gutterBottom variant="subtitle1">
                <strong>{r.tenantName} :</strong>
                {r.review}
              </Typography>

                {
                  r?.rate === '1' && (
                    <><StarOutlined/><StarBorderOutlined/><StarBorderOutlined/><StarBorderOutlined/><StarBorderOutlined/> </>
                  )
                }
                                {
                  r?.rate === '2' && (
                    <> <StarOutlined/><StarOutlined/><StarBorderOutlined/><StarBorderOutlined/><StarBorderOutlined/> </>
                  )
                }
                                {
                  r?.rate === '3' && (
                    <> <StarOutlined/><StarOutlined/><StarOutlined/><StarBorderOutlined/><StarBorderOutlined/> </>
                  )
                }
                                {
                  r?.rate === '4' && (
                    <> <StarOutlined/><StarOutlined/><StarOutlined/><StarOutlined/><StarBorderOutlined/> </>
                  )
                }
                                {
                  r?.rate === '5' && (
                    <> <StarOutlined/><StarOutlined/><StarOutlined/><StarOutlined/><StarOutlined/> </>
                  )
                }

              </>
            ))}
          </div>
        </div>
        )
        :(<Typography variant="h6">No Reviews</Typography>) 
    );
}
export default CommentSection