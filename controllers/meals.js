const Meal = require('../models/meal');


module.exports = {
    index,
    new: newMeal,
    show,
};

async function show(req, res) {
    const meal = await Meal.findById(req.params.id).populate('');
    const performers = await Performer.find({ _id: { $nin: meal.food } }).sort('name');
    res.render('meals/show', { title: 'Meal Detail', meal, performers });
  }

async function index(req, res) {
    const meals = await Meal.find({});
    res.render('meals/index', { title: 'All Meals', meals })
}

function newMeal(req, res) {
    res.render('meals/new', { title: 'Add Meals', errorMsg: '' });
  }



