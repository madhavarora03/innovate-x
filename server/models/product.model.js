import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  imageUrl: {
    type: String,
    default : "https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049569.jpg?w=1380&t=st=1721482016~exp=1721482616~hmac=181e5197d41af72b5068dfc9c7ff59d14117144900c587b8582bb915eba5de83"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
});

const Product = mongoose.model('Product', productSchema);
export default Product;
