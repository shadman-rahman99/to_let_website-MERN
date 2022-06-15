import axios from 'axios'

const API = axios.create({baseURL:'http://localhost:5000'})
API.interceptors.request.use((req)=> {
    if(localStorage.getItem('profile')){
        // console.log('localStorage -api->index.js:6 : ',JSON.parse(localStorage.getItem('profile')));
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})

export const fetchPost = (id) => API.get(`/posts/${id}`)
export const fetchPosts = ()=> API.get(`/posts`)
export const fetchPostsBySearch = (searchQuery)=> API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
export const createPost = (newPost)=> {API.post('/posts', newPost)}
export const updatePost = (id, updatedPost)=> {API.patch(`/posts/${id}`, updatedPost)}
export const deletePost = (id)=> {API.delete(`/posts/${id}`)}
export const applyRequest = (post_id, tenantName)=> {API.patch(`/posts/applyRequest/${post_id}`,{tenantName})}
export const acceptRequest = (post_id, tenantId, tenantName)=> {API.patch(`/posts/acceptRequest/${post_id}`,{tenantId,tenantName})}
export const deleteRequest = (post_id, tenantId)=> {API.patch(`/posts/deleteRequest/${post_id}`,{tenantId})}
export const comment = (finalComment, post_id)=> {API.post(`/posts/${post_id}/commentPost`, {finalComment} )}
export const createTenantReview = (reviewData)=> {API.post(`/posts/createTenantReview`, {reviewData} )}
export const getTenantReviews = (tenantId) => API.get(`/posts/getTenantReviews/${tenantId}`)
export const createPostReview = (reviewData)=> {API.post(`/posts/createPostReview`, {reviewData} )}
export const getTenants = ()=> API.get(`/posts/getTenants`)
export const removeTenant = (post_id)=> {API.patch(`/posts/removeTenant/${post_id}`)}
export const getInfos = ()=> API.get(`/posts/getInfos`)
export const updateEmail = (postData)=> {API.patch(`/posts/updateEmail`, {postData})}
export const deleteUser = (id)=> {API.delete(`/posts/deleteUser/${id}`)}

export const signIn = (formData)=> API.post('/user/signIn',formData)
export const signUp = (formData)=> API.post('/user/signUp',formData)

