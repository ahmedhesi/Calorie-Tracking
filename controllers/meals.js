const Meal = require('../models/meal');


module.exports = {
    index,
    new: newMeal,
    show,
    create,
    delete: deleteMeal,
    edit,
    update,
    createReviewComment,
    deleteReview,
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
      const updatedMeal = await Meal.findOneAndUpdate(
        {_id: req.params.id, user: req.user._id},
        // update object with updated properties
        req.body,
        // options object {new: true} returns updated doc
        {new: true}
      );
      return res.redirect(`/meals/${updatedMeal._id}`);
    } catch (e) {
      console.log(e.message);
      return res.redirect('/meals');
    }
  }

  async function createReviewComment(req, res) {
    const meal = await Meal.findById(req.params.id);

    // Add the user-centric info to req.body (the new review)
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;

    meal.reviews.push(req.body);
    try {
        await meal.save();
    } catch (err) {
        console.log(err);
    }
    res.redirect(`/meals/${meal._id}`)
}

async function deleteReview(req, res) {
    // Note the cool "dot" syntax to query on the property of a subdoc
    const meal = await Meal.findOne({ 'reviews._id': req.params.id, 'reviews.user': req.user._id });
    // Rogue user!
    if (!meal) return res.redirect('/meals');
    // Remove the review using the remove method available on Mongoose arrays
    meal.reviews.remove(req.params.id);
    // Save the updated movie doc
    await meal.save();
    // Redirect back to the movie's show view
    res.redirect(`/meals/${meal._id}`);
  }


