import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    houseName: String,
    location: String,
    description: String,
    rentFee: String,
    creator_id: { type: String, required: true },
    creator_name: String,
    selectedImage_1 : String,
    selectedImage_2 : String,
    selectedImage_3 : String,
    selectedImage_4 : String,
    tenant : { type: [], default: [] },
    revAndRate: {
        type: [],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    tenant_req: {
        type: [],
        default: [],
    }
})

const Posts  = mongoose.model('posts', postSchema) 
export default Posts