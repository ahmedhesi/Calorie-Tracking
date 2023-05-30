const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    content: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    userName: String,
    userAvatar: String
  }, {
    timestamps: true
  });

const mealSchema = new Schema({
     food: {
        type: String,
        required: true
     },
     calories: {
        type: Number,
        required: true
     },
     carbs: {
        type: String,
        required: true
     },
     protien: {
        type: String,
        required: true
     },
     fat: {
        type: String,
        required: true
     },
     reviews: [reviewSchema],
     user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      userName: String,
      userAvatar: String
    }, {
      timestamps: true
     
})


module.exports = mongoose.model('Meal', mealSchema);