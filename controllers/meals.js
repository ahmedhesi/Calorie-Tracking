const Meal = require('../models/meal');


module.exports = {
    index,
    new: newMeal,
};

async function index(req, res) {
    const meals = await Meal.find({});
    res.render('meals/index', { title: 'All Meals', meals })
}

function newMovie(req, res) {
    res.render('meals/new', { title: 'Add Meals', errorMsg: '' });
  }
