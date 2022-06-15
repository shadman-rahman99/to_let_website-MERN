import express from 'express'

import { bugfixing, getPost, getPosts,  createPosts, updatePost, deletePost,deleteUser, applyRequest, acceptRequest, deleteRequest, createTenantReview, getTenantReviews, createPostReview, getTenants, removeTenant, getInfos, updateEmail } from '../controllers/posts.js'
import auth from '../middleware/auth.js'

// Sort the restful APIs from each type(e.g. get,post) in descending order based on their URL length.
// For e.g. get('/search',getPostsBySearch) should come before get('/:id', getPost). Otherwise
// when manually searching post with a url, for e.g. 
// http://localhost:3000/posts/search?searchQuery=none&tags=javascript, router will route to  
// get('/:id', getPost) considering the term search from the url as the id since search is 
// right after '/posts'.
const router = express.Router()
// router.get('/search',getPostsBySearch)
router.get('/getTenantReviews/:tenant_id', getTenantReviews)
router.get('/getTenants', getTenants)
router.get('/getInfos', getInfos)
router.get('/bugfixing', bugfixing)
router.get('/:id', getPost)
router.get('/', getPosts)


// router.post('/:post_id/commentPost',auth, commentPost)
router.post('/', auth, createPosts)
router.post('/createTenantReview', auth, createTenantReview)
router.post('/createPostReview', auth, createPostReview)

// router.patch('/:id/likePost',auth, likePost)
router.patch('/applyRequest/:post_id',auth, applyRequest)
router.patch('/acceptRequest/:post_id',auth, acceptRequest)
router.patch('/deleteRequest/:post_id',auth, deleteRequest)
router.patch('/removeTenant/:post_id',auth, removeTenant)
router.patch('/updateEmail', updateEmail)
router.patch('/:id',auth, updatePost)

router.delete('/deleteUser/:id', deleteUser)
router.delete('/:id',auth, deletePost)

export default router;