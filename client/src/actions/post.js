// Initializing every action type for dispatch as a const variable rather
// than string because misspelling string will not always be specifically 
// mentioned in our console but even if we misspell variables it will be
//  accurately shown on console. 
import { FETCH_ALL, FETCH_POST, COMMENT, START_LOADING, END_LOADING, CREATE, UPDATE, DELETE, APPLY_REQUEST, ACCEPT_REQUEST, DELETE_REQUEST } from '../constants/actionTypes'
// importing everything from api folder's index.js (by default system chooses
// index.js if any js file not mentioned).
import * as api from '../api'

// Getting single post when click on a memory card from the posts page
export const getPost = (id) => async (dispatch)=> {
    try{
        dispatch({ type: START_LOADING })
        // destructuring the data getting from api.fetchPosts() in { data } 
        // At the same time api.fetchPosts() already executes the database function.
        const { data } = await api.fetchPost(id)
        // console.log(data);
        // Assumption- Calling dispatch() and sending the data fetched from the backend to the 
        // reducer( reducer-> post.js). Then receiving all the data in Post.js using useSelector
        //  from the reducer to print them.
        dispatch({type: FETCH_POST, payload: data})
        dispatch({ type: END_LOADING })
    }catch(error){
        console.log(error);
    }
}

export const getPosts = () => async (dispatch)=> {
    try{
        dispatch({ type: START_LOADING })
        // destructuring the data getting from api.fetchPosts() in { data } 
        // At the same time api.fetchPosts() already executes the database function.
        const { data } = await api.fetchPosts()
        // console.log(data);
        // Assumption- Calling dispatch() and sending the data fetched from the backend to the 
        // reducer( reducer-> post.js). Then receiving all the data in Post.js using useSelector
        //  from the reducer to print them.
        dispatch({type: FETCH_ALL, payload: data})
        dispatch({ type: END_LOADING })
    }catch(error){
        console.log(error);
    }
}

export const createPost = (post,setError)=> async(dispatch)=> {
    try{
        dispatch({ type: START_LOADING })
        const {data} = await api.createPost(post)
        if(data?.message) return setError(data?.message); 
        dispatch({type: CREATE, payload: data})
        dispatch({ type: END_LOADING })
    }catch(error){
        console.log(error);
    }
}

export const updatePost = (id, post)=> async(dispatch)=>{
     try{
        const {data} =  api.updatePost(id, post) 
        dispatch({ type: UPDATE, payload: data })
     }catch(error){
         console.log(error);
     }
}

export const deletePost = (id) => async(dispatch)=> {
    try{
        api.deletePost(id)
        dispatch({ type:DELETE, payload: id })
    }catch(error){
        console.log(error);
    }
}

export const applyRequest = (post_id, tenantName) => async(dispatch)=> {
    try {
        const {data} = api.applyRequest(post_id, tenantName)
        dispatch({ type: APPLY_REQUEST, payload: data })
    } catch (error) {
        console.log(error);
    }
}
export const acceptRequest = (post_id, tenantId, tenantName) => async(dispatch)=> {
    try {
        const {data} = api.acceptRequest(post_id, tenantId, tenantName)
        dispatch({ type: ACCEPT_REQUEST, payload: data })
    } catch (error) {
        console.log(error);
    }
}  
export const deleteRequest = (post_id, tenantId) => async(dispatch)=> {
    try {
        const {data} = api.deleteRequest(post_id, tenantId)
        dispatch({ type: DELETE_REQUEST, payload: data })
    } catch (error) {
        console.log(error);
    }
} 

// export const likePost = (id)=> async(dispatch)=>{
//     try{
//         // console.log("\nPost-ID-Client:",id);
//         const {data} =  api.likePost(id) 
//         dispatch({ type: LIKE, payload: data })
//      }catch(error){
//          console.log(error);
//      }
// }
export const commentPost = (finalComment, post_id)=> async(dispatch)=>{
    try {
        const { data } = api.comment(finalComment, post_id)
        dispatch({ type:COMMENT, payload:data  })
        return data.comments
    } catch (error) {
        console.log(error)
    }
}

export const createTenantReview = (reviewData)=> async(dispatch)=>{
    try {
        const { data } = api.createTenantReview(reviewData)
        // dispatch({ type:COMMENT, payload:data  })
        // return data.comments
    } catch (error) {
        console.log(error)
    }
}

export const getTenantReviews = (tenantId,setTenantReviews) => async (dispatch)=> {
    try{
        // destructuring the data getting from api.fetchPosts() in { data } 
        // At the same time api.fetchPosts() already executes the database function.
        const { data } = await api.getTenantReviews(tenantId)
        setTenantReviews(data)
        // console.log(data);
        // Assumption- Calling dispatch() and sending the data fetched from the backend to the 
        // reducer( reducer-> post.js). Then receiving all the data in Post.js using useSelector
        //  from the reducer to print them.
    }catch(error){
        console.log(error);
    }
}

export const createPostReview = (reviewData)=> async(dispatch)=>{
    try {
        const { data } = api.createPostReview(reviewData)
    } catch (error) {
        console.log(error)
    }
}

export const getTenants = (setTenants) => async (dispatch)=> {
    try{
        const { data } = await api.getTenants()
        setTenants(data)
    }catch(error){
        console.log(error);
    }
}

export const removeTenant = (post_id) => async (dispatch)=> {
    try{
        const { data } = await api.removeTenant(post_id)
    }catch(error){
        console.log(error);
    }
}

export const getInfos = (setInfo) => async (dispatch)=> {
    try{
        const { data } = await api.getInfos()
        setInfo(data)
        // console.log(data);
    }catch(error){
        console.log(error);
    }
}

export const updateEmail = (postData,setRefresh)=> async(dispatch)=>{
     try{
        const {data} = await api.updateEmail(postData) 
        if(data?.message) return setRefresh(true); 
        // dispatch({ type: UPDATE, payload: data })
     }catch(error){
         console.log(error);
     }
}

export const deleteUser = (id) => async(dispatch)=> {
    try{
        api.deleteUser(id)
    }catch(error){
        console.log(error);
    }
}
