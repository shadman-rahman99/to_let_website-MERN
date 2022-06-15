import mongoose from 'mongoose'
import Posts from '../models/posts.js'
import User from '../models/user.js'
import TenantReview from '../models/tenantReview.js'
import express from 'express'
const app = express()

export const getPost = async(req,res)=>{
    const {id} = req.params 
    try {
        const post = await Posts.findById(id)
        res.status(200).json(post)
    } catch (error) {
        console.log("controller->posts.js->getPost() : ",error);
        res.status(404).json({message: error})
    }
}

export const getPosts = async(req,res )=>{
    try{
        // sort({_id: -1}) is getting us latest post first. 
        const posts = await Posts.find().sort({_id: -1})
        res.status(200).json(posts)
    }catch(error){
        res.status(404).json({message: error.message})
    }
}

export const createPosts = async (req,res)=>{
    // req.userId is passing in through the middleware
    const newPost = new Posts({...req.body, creator_id:req.userId, createdAt: new Date().toISOString()})
    // return console.log('\n',newPost);
    try{
        await newPost.save()
        res.status(201).json(newPost)
        console.log(`\nPost created at ${new Date()}`);
    }catch(error){
        res.send({message: 'Try logging in please'})
        console.log(error);
    }
}

export const updatePost = async(req,res)=> {
    // for URLs like 'localhost:5000/posts/(any_value)' req.params returns the
    // value from any_value. 
    const { id: _id } = req.params 
    //Checking if there is any post with that id.
    if(!mongoose.Types.ObjectId.isValid(_id)){
        res.status(404).json("controller->post.js->updatePost(): No post with that id found") 
        console.log("\ncontroller->post.js->updatePost(): No post with that id found");
    }else{
        // console.log('\nReq.BODY : ',req.body.postData);
        const updatedPost = await Posts.findByIdAndUpdate(_id, req.body, {new:true})
        res.json(updatedPost)
        console.log("updatePost function completed");
    }
}

export const deletePost = async(req,res)=> {
    const {id} =req.params 
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).send("controller->post.js->deletePost(): No post with that id found") 
        console.log("\ncontroller->post.js->deletePost(): No post with that id found");
    }else{
        await Posts.findByIdAndRemove(id)
        console.log('\ndeletePost function completed');
    }
}

export const applyRequest = async(req,res)=> {
    const {post_id} =req.params 
    const request = {id: req.userId, name: req.body.tenantName }
    console.log('\nRequest : ', request);

    console.log('\nreq.userId-controller->post.js:55: ',req.userId);
    // checking userId from middleware's auth()
    if(!req.userId){
        res.json({message:'Unauthenticated-middleware'})
        console.log('\nUnauthenticated access, req.userId is null-controller->post.js:59: ',);
        return
    }
    if(!mongoose.Types.ObjectId.isValid(post_id)){
        res.status(404).send("controller->post.js->likePost(): No post with that id found-middleware") 
        console.log("\ncontroller->post.js->likePost(): No post with that id found-middleware");
        return
    }
    const post = await Posts.findById(post_id) 
    post.tenant_req.push(request)
   
    const updatedPost = await Posts.findByIdAndUpdate(post_id, post ,{new:true})
    res.json(updatedPost)
    console.log('applyRequest func complete');
}

export const acceptRequest = async(req,res)=> {
    const {post_id} =req.params 
    const request = {id: req.body.tenantId, name: req.body.tenantName }
    console.log('\nRequest : ', request);

    console.log('\nreq.userId-controller->post.js:55: ',req.userId);
    // checking userId from middleware's auth()
    if(!req.userId){
        res.json({message:'Unauthenticated-middleware'})
        console.log('\nUnauthenticated access, req.userId is null-controller->post.js:59: ',);
        return
    }
    if(!mongoose.Types.ObjectId.isValid(post_id)){
        res.status(404).send("controller->post.js->likePost(): No post with that id found-middleware") 
        console.log("\ncontroller->post.js->likePost(): No post with that id found-middleware");
        return
    }
    const post = await Posts.findById(post_id) 
    post.tenant_req = []
    post.tenant.push(request)
    const updatedPost = await Posts.findByIdAndUpdate(post_id, post ,{new:true})
    res.json(updatedPost)
    console.log('acceptRequest func complete');
}

export const deleteRequest = async(req,res)=> {
    const {post_id} =req.params 
    // console.log('\nRequest : ', request);

    console.log('\nreq.userId-controller->post.js:55: ',req.userId);
    // checking userId from middleware's auth()
    if(!req.userId){
        res.json({message:'Unauthenticated-middleware'})
        console.log('\nUnauthenticated access, req.userId is null-controller->post.js:59: ',);
        return
    }
    if(!mongoose.Types.ObjectId.isValid(post_id)){
        res.status(404).send("controller->post.js->likePost(): No post with that id found-middleware") 
        console.log("\ncontroller->post.js->likePost(): No post with that id found-middleware");
        return
    }
    const post = await Posts.findById(post_id) 
    post.tenant_req = post.tenant_req.filter(({id})=> id !== req.body.tenantId )
    console.log('Post : ',post);
    
    const updatedPost = await Posts.findByIdAndUpdate(post_id, post ,{new:true})
    res.json(updatedPost)
    console.log('deleteRequest func complete');
}

export const createTenantReview = async(req,res)=> {
    const { ownerId, ownerName, review, rate, tenantId, tenantName } = req.body.reviewData
    // console.log('\nREview : ', { ownerId, ownerName, review, rate });

    console.log('\nreq.userId-controller->post.js:55: ',req.userId);
    // checking userId from middleware's auth()
    if(!req.userId){
        res.json({message:'Unauthenticated-middleware'})
        console.log('\nUnauthenticated access, req.userId is null-controller->post.js:59: ',);
        return
    }
    const newTenantReview = new TenantReview({ ownerId, ownerName, review, rate, tenantId, tenantName })
    try{
        await newTenantReview.save()
        res.status(201).json(newTenantReview)
        console.log(`\nTenant Review created at ${new Date()}`);
    }catch(error){
        res.send({message: 'Try logging in please'})
        console.log(error);
    }
    console.log('\n',newTenantReview);
    console.log('\ncreateTenantReview func complete');
}

export const getTenantReviews = async(req,res)=>{
    const {tenant_id} = req.params 
    try {
        const tenantReviews = await TenantReview.find({tenantId:tenant_id })
        res.status(200).json(tenantReviews)
    } catch (error) {
        console.log("controller->posts.js->getPost() : ",error);
        res.status(404).json({message: error})
    }
}

export const createPostReview = async(req,res)=> {
    const { tenantId, tenantName, review, rate, postId } = req.body.reviewData
    // console.log('\nREview : ', { ownerId, ownerName, review, rate });

    console.log('\nreq.userId-controller->post.js:55: ',req.userId);
    // checking userId from middleware's auth()
    if(!req.userId){
        res.json({message:'Unauthenticated-middleware'})
        console.log('\nUnauthenticated access, req.userId is null-controller->post.js:59: ',);
        return
    }
    const post = await Posts.findById(postId) 
    if(!post){
        res.json({message:'No post with that ID found'})
        console.log('\nNo post with that ID found ',);
        return
    }
    post.revAndRate.push({ tenantId, tenantName, review, rate })
    const updatedPost = await Posts.findByIdAndUpdate(postId, post ,{new:true})
    res.json(updatedPost)
    console.log('createPostReview func complete');
}

export const getTenants = async(req,res )=>{
    try{
        // sort({_id: -1}) is getting us latest users first. 
        const tenants = await User.find({userType: 'TENANT'}).sort({_id: -1})
        res.status(200).json(tenants)
    }catch(error){
        res.status(404).json({message: error.message})
    }
}

export const removeTenant = async(req,res)=> {
    const {post_id} =req.params 

    console.log('\nreq.userId-controller->post.js:55: ',req.userId);
    // checking userId from middleware's auth()
    if(!req.userId){
        res.json({message:'Unauthenticated-middleware'})
        console.log('\nUnauthenticated access, req.userId is null-controller->post.js:59: ',);
        return
    }
    if(!mongoose.Types.ObjectId.isValid(post_id)){
        res.status(404).send("controller->post.js->likePost(): No post with that id found-middleware") 
        console.log("\ncontroller->post.js->likePost(): No post with that id found-middleware");
        return
    }
    const post = await Posts.findById(post_id) 
    post.tenant = []
    const updatedPost = await Posts.findByIdAndUpdate(post_id, post ,{new:true})
    res.json(updatedPost)
    console.log('removeTenant func complete');
}

export const getInfos = async(req,res )=>{
    try{
        // sort({_id: -1}) is getting us latest post first. 
        let posts = await Posts.find().sort({_id: -1})
        posts =  posts.filter(({revAndRate})=> revAndRate.length !== 0 )

        const tenantReviews = await TenantReview.find().sort({_id: -1})
        const owners = await User.find({userType:'OWNER'}).sort({_id: -1})
        const tenants = await User.find({userType:'TENANT'}).sort({_id: -1})

        console.log('\n',posts.length,'\n',tenantReviews,'\n',owners,'\n',tenants);
        res.status(200).json({posts,tenantReviews,owners,tenants})
    }catch(error){
        res.status(404).json({message: error.message})
    }
}

export const updateEmail = async(req,res)=> {
     
    const { userId, prevEmail, newEmail } = req.body.postData
    // return console.log(userId, prevEmail, newEmail); 
    const userInfo = await User.findById(userId)
    userInfo.email = newEmail
    // return console.log(userInfo);
    const updatedUser = await User.findByIdAndUpdate(userId, userInfo ,{new:true})
    console.log(updatedUser);
    res.status(200).json({message: 'message'})

}

export const deleteUser = async(req,res)=> {
    const {id} =req.params 
    await User.findByIdAndRemove(id)
    console.log('\ndeleteUser function completed');
}

export const bugfixing = async(req,res)=> {
    const id = "625580ebd9ee34e3a3b919f1" 
    try {
        const post = await Posts.findById(id)
        let allRates = 0
        let avgrate = 0 
        if(post?.revAndRate.length !== 0){
            post?.revAndRate?.map(rate=>{
                allRates+= parseInt(rate?.rate)
            })
            avgrate=allRates/post?.revAndRate.length
        }else{
            avgrate='No Ratings'
        }
        res.status(200).json(avgrate)
    } catch (error) {
        console.log("controller->posts.js->getPost() : ",error);
        res.status(404).json({message: error})
    }
}
