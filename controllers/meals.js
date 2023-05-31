const Meal = require('../models/meal');


module.exports = {
    index,
    new: newMeal,
    show,
    create,
    deleteMeal,
};

async function show(req, res) {
    const meal = await Meal.findById(req.params.id);
    res.render('meals/show', { title: 'Meal Detail', meal });
  }

async function index(req, res) {
    const meals = await Meal.find({});
    res.render('meals/index', { title: 'All Meals', meals })
}

function newMeal(req, res) {
    res.render('meals/new', { title: 'Add Meals', errorMsg: '' });
  }

async function create(req, res) {
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;
    try {
      await Meal.create(req.body); 
      res.redirect(`/meals`);
    } catch (err) {
      console.log(err);
      res.render('meals/new', { errorMsg: err.message });
    }
  }

  async function deleteMeal(req, res) {
    await Meal.findOneAndDelete(
      {_id: req.params.id, userRecommending: req.user._id}
    );
    res.redirect('/meals');
  }





