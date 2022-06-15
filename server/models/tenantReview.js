import mongoose from 'mongoose'

const tenantReviewSchema = mongoose.Schema({
    ownerId: { type: String, required:  true },
    ownerName: { type: String, required: true },
    review: { type: String, required: true },
    rate: { type: String, required: true },
    tenantId: { type: String, required: true },
    tenantName: { type: String, required: true },
  });

  const tenantReview  = mongoose.model("tenantReview", tenantReviewSchema) 
  export default tenantReview;
