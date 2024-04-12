import mongoose from "mongoose";

const gigSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    totalStars: {
      type: Number,
      default: 0,
    },
    star: {
      type: Number,
      default: 0,
      enum: [0, 1, 2, 3, 4, 5],
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: false,
    },
    shortTitle: {
      type: String,
      required: true,
    },
    shortDesc: {
      type: String,
      required: true,
    },
    deliveryTime: {
      type: Number,
      required: true,
    },
    revisionNumber: {
      type: Number,
      required: true,
    },
    features: {
      type: [String],
      required: false,
    },
    sales: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Gig = mongoose.model("gig", gigSchema);

export default Gig;

// const gig = {
//   "title":"Gig 1 Title",
//   "desc": "Gig 1. Desc",
//   "price": 59,
//   "cover": "https://images.pexels.com/photos/15254469/pexels-photo-15254469.jpeg?auto-compress&cs=tinysrgb&w=1600&lazy=load",
//   "images": ["https://images.pexels.com/photos/11581859/pexels-photo-11581859.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load", "https://images.pexels.com/photos/12242010/pexels-photo-12242010.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load", "https://images.pexels.com/photos/4551011/pexels-photo-4551011.jpeg?auto=compress&cs-tinysrgb&w=1600&lazy=load"],
//   "totalStars": 4,
//   "shortTitle": "Gig 1 Short Title",
//   "shortDesc": "Gig 1 Short Desc",
//   "deliveryTime": 3,
//   "revisionNumber": 3,
//   "features": ["feature-1", "feature 2", "feature 3"]
// }