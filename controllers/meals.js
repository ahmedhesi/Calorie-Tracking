const Meal = require('../models/meal');


module.exports = {
    index,
    new: newMeal,
    show,
    create,
    delete: deleteMeal,
    edit,
    update,
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
      {_id: req.params.id, user: req.user._id}
    );
    res.redirect('/meals');
  }

  async function edit(req, res) {
    const meal = await Meal.findOne({_id: req.params.id, user: req.user._id});
    console.log(meal)
    if (!meal) return res.redirect('/meals');
    res.render('meals/edit', { meal });
  }

  async function update(req, res) {
    try {
      const updatedBook = await Book.findOneAndUpdate(
        {_id: req.params.id, userRecommending: req.user._id},
        // update object with updated properties
        req.body,
        // options object {new: true} returns updated doc
        {new: true}
      );
      return res.redirect(`/books/${updatedBook._id}`);
    } catch (e) {
      console.log(e.message);
      return res.redirect('/books');
    }
  }





